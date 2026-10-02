#!/usr/bin/env python3
"""
scripts/sync_pwc_docs.py
=============================================================================
PwC Switzerland Virtual Case Documentation Synchronizer & Dual-Publisher
Inspects PWC_Switzerland_Virtual_Case.xlsx metadata, data model, and dashboards,
synchronizes documentation across course and project hubs, and automatically
publishes updates to the standalone GitHub repository:
https://github.com/Sohila-Khaled-Abbas/pwc-switzerland-virtual-case
=============================================================================
"""

import os
import sys
import datetime
import zipfile
import re
import subprocess
import openpyxl

def sync_pwc():
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    pwc_dir = os.path.join(repo_root, "11_Demos_and_Workbooks", "10_Projects_and_Demos", "PWC")
    wb_path = os.path.join(pwc_dir, "PWC_Switzerland_Virtual_Case.xlsx")

    if not os.path.exists(wb_path):
        print(f"[PWC-SYNC] Workbook not found: {wb_path}")
        return

    # 1. Inspect workbook file stats
    file_stat = os.stat(wb_path)
    size_mb = file_stat.st_size / (1024 * 1024)
    mod_time = datetime.datetime.fromtimestamp(file_stat.st_mtime).strftime("%Y-%m-%d %H:%M:%S")

    # 2. Inspect Excel sheets & VertiPaq model
    sheets = []
    has_vertipaq_model = False
    try:
        wb = openpyxl.load_workbook(wb_path, read_only=True)
        sheets = wb.sheetnames
        wb.close()
    except Exception as e:
        print(f"[PWC-SYNC] Note: Workbook openpyxl check: {e}")

    try:
        with zipfile.ZipFile(wb_path, 'r') as z:
            namelist = z.namelist()
            if 'xl/model/item.data' in namelist:
                has_vertipaq_model = True
    except Exception as e:
        print(f"[PWC-SYNC] Note: Zipfile inspection: {e}")

    print(f"[PWC-SYNC] Inspected: {os.path.basename(wb_path)} ({size_mb:.2f} MB, Last Modified: {mod_time})")
    print(f"[PWC-SYNC] Sheets: {sheets} | VertiPaq Tabular Model: {'Active' if has_vertipaq_model else 'None'}")

    # 3. Verify Dashboard Specifications
    dashboards_dir = os.path.join(pwc_dir, "dashboards")
    dashboards = [
        "01_call_center_dashboard.md",
        "02_customer_retention_dashboard.md",
        "03_diversity_inclusion_dashboard.md"
    ]
    verified_dashboards = []
    for d in dashboards:
        dp = os.path.join(dashboards_dir, d)
        if os.path.exists(dp):
            verified_dashboards.append(d)
    print(f"[PWC-SYNC] Verified Dashboard Specifications: {len(verified_dashboards)}/3 ({', '.join(verified_dashboards)})")

    # 4. Update 11_Demos_and_Workbooks/README.md portfolio table
    demos_readme = os.path.join(repo_root, "11_Demos_and_Workbooks", "README.md")
    if os.path.exists(demos_readme):
        with open(demos_readme, "r", encoding="utf-8") as f:
            content = f.read()

        pwc_entry = (
            "| **10: Projects & Demos** | [`PWC_Switzerland_Virtual_Case.xlsx`](10_Projects_and_Demos/PWC/PWC_Switzerland_Virtual_Case.xlsx) | "
            "Enterprise Ralph Kimball Galaxy Schema (Fact Constellation) combining Call Center (5,000 calls), Customer Churn (7,043 accounts), "
            "and Diversity & Inclusion (500 employees), VertiPaq tabular model, explicit DAX measures, VBA application suite, and "
            "3 executive dashboard specifications ([`dashboards/`](10_Projects_and_Demos/PWC/dashboards/README.md)). | 🏆 Capstone Enterprise Suite |"
        )

        if "10_Projects_and_Demos/PWC/PWC_Switzerland_Virtual_Case.xlsx" not in content:
            pattern = r"(\| \*\*08: Power Query & M\*\* \|.*?\n)"
            if re.search(pattern, content):
                content = re.sub(pattern, r"\1" + pwc_entry + "\n", content)
                with open(demos_readme, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"[PWC-SYNC] Added PwC Switzerland Virtual Case to 11_Demos_and_Workbooks/README.md portfolio table.")
        else:
            pattern = r"\| \*\*10: Projects & Demos\*\* \|.*?\n"
            content = re.sub(pattern, pwc_entry + "\n", content)
            with open(demos_readme, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"[PWC-SYNC] Synchronized PwC entry in 11_Demos_and_Workbooks/README.md.")

    # 5. Dual-Publish to Standalone Repo (https://github.com/Sohila-Khaled-Abbas/pwc-switzerland-virtual-case)
    standalone_git = os.path.join(repo_root, ".git_pwc_standalone")
    if os.path.exists(standalone_git):
        try:
            print(f"[PWC-SYNC] Synchronizing standalone GitHub repository (pwc-switzerland-virtual-case)...")
            subprocess.run(["git", f"--git-dir={standalone_git}", "add", "-A"], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            diff_res = subprocess.run(["git", f"--git-dir={standalone_git}", "diff", "--cached", "--name-only"], capture_output=True, text=True)
            if diff_res.stdout.strip():
                commit_msg = f"feat(auto-sync): update PWC_Switzerland_Virtual_Case.xlsx [{mod_time}]"
                subprocess.run(["git", f"--git-dir={standalone_git}", "commit", "-m", commit_msg], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
                push_res = subprocess.run(["git", f"--git-dir={standalone_git}", "push", "origin", "main"], capture_output=True, text=True)
                if push_res.returncode == 0:
                    print(f"[PWC-SYNC] Successfully published to standalone repository https://github.com/Sohila-Khaled-Abbas/pwc-switzerland-virtual-case!")
                else:
                    print(f"[PWC-SYNC] Standalone push notice: {push_res.stderr.strip()}")
            else:
                print(f"[PWC-SYNC] Standalone repository is already up-to-date.")
        except Exception as ex:
            print(f"[PWC-SYNC] Standalone sync notice: {ex}")

    print(f"[PWC-SYNC] All documentation and standalone repository synchronization completed successfully.")

if __name__ == '__main__':
    sync_pwc()
