#!/usr/bin/env python3
"""Generate Manage Licenses H2D import from Invite Student capture."""

from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src/imports/StepsExxatComAdminProfileConfigurationInviteStudent1440WDefault.tsx"
DEST = ROOT / "src/imports/StepsExxatComAdminProfileConfigurationManageLicenses1440WDefault.tsx"

MANAGE_LICENSES_SIDEBAR = """
                                                <div className="ng-star-inserted" style={{borderColor: 'rgba(0, 0, 0, 0.87)', color: 'rgba(0, 0, 0, 0.87)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', letterSpacing: '-0.1px', lineHeight: '19.6px', outlineColor: 'rgba(0, 0, 0, 0.87)', outlineWidth: '3px', WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)', WebkitTextStrokeColor: 'rgba(0, 0, 0, 0.87)', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}}>
                                                  <button id="SetUpmanage-licenses" className="p-0 w-100-p parent mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base active-item-class" style={{width: '100%', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderColor: 'rgb(0, 0, 0) rgb(0, 0, 0) rgb(0, 0, 0) rgb(63, 81, 181)', borderStyle: 'none none none solid', borderWidth: '0px 0px 0px 4px', color: 'rgb(0, 0, 0)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', justifyContent: 'center', lineHeight: '19.6px', minHeight: '40px', minWidth: '80px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', padding: '0px 0px 0px 35px', position: 'relative', textAlign: 'center', verticalAlign: 'middle', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}}>
                                                    <span className="mat-mdc-button-persistent-ripple mdc-button__ripple" style={{borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', position: 'absolute', textAlign: 'center', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}} />
                                                    <span className="mdc-button__label" style={{borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'contents', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', position: 'relative', textAlign: 'center', whiteSpace: 'break-spaces', zIndex: '1', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}}>
                                                      <mat-list-item className="mat-mdc-list-item mdc-list-item py-12 px-16 w-100-p mat-mdc-list-item-single-line mdc-list-item--with-one-line" style={{width: '100%', alignContent: 'center', alignItems: 'center', borderColor: 'rgb(0, 0, 0) rgb(0, 0, 0) rgb(0, 0, 0) rgba(0, 0, 0, 0)', borderStyle: 'none none none solid', borderWidth: '0px 0px 0px 4px', color: 'rgb(0, 0, 0)', display: 'flex', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', justifyContent: 'flex-start', lineHeight: '19.6px', minHeight: '40px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', padding: '11px 16px 11px 8px', position: 'relative', textAlign: 'center', whiteSpace: 'break-spaces', zIndex: '1', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}}>
                                                        <span className="mdc-list-item__content" style={{width: '100%', alignItems: 'center', alignSelf: 'center', borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'flex', flexBasis: '0%', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', position: 'relative', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'break-spaces', order: '0', flexGrow: '1', flexShrink: '1', opacity: '1'}}>
                                                          <span className="mat-mdc-list-item-unscoped-content mdc-list-item__primary-text" style={{width: '100%', borderColor: 'rgba(0, 0, 0, 0.87)', color: 'rgba(0, 0, 0, 0.87)', display: 'contents', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '22px', outlineColor: 'rgba(0, 0, 0, 0.87)', outlineWidth: '3px', overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', textAlign: 'center', textOverflow: 'ellipsis', WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)', WebkitTextStrokeColor: 'rgba(0, 0, 0, 0.87)', whiteSpace: 'break-spaces', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}}>
                                                            <span className="text-left overflow-ellipses w-100-p pl-16 ng-star-inserted" style={{width: '100%', borderColor: 'rgba(0, 0, 0, 0.87)', color: 'rgba(0, 0, 0, 0.87)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '22px', outlineColor: 'rgba(0, 0, 0, 0.87)', outlineWidth: '3px', overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', padding: '0px 0px 0px 16px', textAlign: 'left', textOverflow: 'ellipsis', WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)', WebkitTextStrokeColor: 'rgba(0, 0, 0, 0.87)', whiteSpace: 'nowrap', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}}>
                                                              <span style={{whiteSpace: 'pre-wrap', fontFamily: '\\'Source Sans Pro\\', sans-serif'}}>Manage Licenses</span>
                                                            </span>
                                                          </span>
                                                        </span>
                                                        <div className="mat-focus-indicator" style={{borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', position: 'absolute', textAlign: 'center', whiteSpace: 'break-spaces', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}} />
                                                      </mat-list-item>
                                                    </span>
                                                    <span className="mat-focus-indicator" style={{borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', position: 'absolute', textAlign: 'center', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}} />
                                                    <span className="mat-mdc-button-touch-target" style={{height: '48px', top: '50%', borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', position: 'absolute', textAlign: 'center', transform: 'matrix(1, 0, 0, 1, 0, -24)', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}} />
                                                    <span className="mat-ripple mat-mdc-button-ripple" style={{borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', position: 'absolute', textAlign: 'center', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}} />
                                                  </button>
                                                </div>
"""

INVITE_SIDEBAR_INACTIVE = """
                                                <div className="ng-star-inserted" style={{borderColor: 'rgba(0, 0, 0, 0.87)', color: 'rgba(0, 0, 0, 0.87)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', letterSpacing: '-0.1px', lineHeight: '19.6px', outlineColor: 'rgba(0, 0, 0, 0.87)', outlineWidth: '3px', WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)', WebkitTextStrokeColor: 'rgba(0, 0, 0, 0.87)', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}}>
                                                  <button id="SetUpmanage-licenses" className="p-0 w-100-p parent mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base" style={{width: '100%', alignItems: 'center', borderColor: 'rgb(0, 0, 0) rgb(0, 0, 0) rgb(0, 0, 0) rgb(255, 255, 255)', borderStyle: 'none none none solid', borderWidth: '0px 0px 0px 4px', color: 'rgb(0, 0, 0)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', justifyContent: 'center', lineHeight: '19.6px', minHeight: '40px', minWidth: '80px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', padding: '0px 0px 0px 35px', position: 'relative', textAlign: 'center', verticalAlign: 'middle', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}}>
                                                    <span className="mat-mdc-button-persistent-ripple mdc-button__ripple" style={{borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', position: 'absolute', textAlign: 'center', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}} />
                                                    <span className="mdc-button__label" style={{borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'contents', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', position: 'relative', textAlign: 'center', whiteSpace: 'break-spaces', zIndex: '1', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}}>
                                                      <mat-list-item className="mat-mdc-list-item mdc-list-item py-12 px-16 w-100-p mat-mdc-list-item-single-line mdc-list-item--with-one-line" style={{width: '100%', alignContent: 'center', alignItems: 'center', borderColor: 'rgb(0, 0, 0) rgb(0, 0, 0) rgb(0, 0, 0) rgba(0, 0, 0, 0)', borderStyle: 'none none none solid', borderWidth: '0px 0px 0px 4px', color: 'rgb(0, 0, 0)', display: 'flex', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', justifyContent: 'flex-start', lineHeight: '19.6px', minHeight: '40px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', padding: '11px 16px 11px 8px', position: 'relative', textAlign: 'center', whiteSpace: 'break-spaces', zIndex: '1', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}}>
                                                        <span className="mdc-list-item__content" style={{width: '100%', alignItems: 'center', alignSelf: 'center', borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'flex', flexBasis: '0%', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', position: 'relative', textAlign: 'center', textOverflow: 'ellipsis', whiteSpace: 'break-spaces', order: '0', flexGrow: '1', flexShrink: '1', opacity: '1'}}>
                                                          <span className="mat-mdc-list-item-unscoped-content mdc-list-item__primary-text" style={{width: '100%', borderColor: 'rgba(0, 0, 0, 0.87)', color: 'rgba(0, 0, 0, 0.87)', display: 'contents', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '22px', outlineColor: 'rgba(0, 0, 0, 0.87)', outlineWidth: '3px', overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', textAlign: 'center', textOverflow: 'ellipsis', WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)', WebkitTextStrokeColor: 'rgba(0, 0, 0, 0.87)', whiteSpace: 'break-spaces', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}}>
                                                            <span className="text-left overflow-ellipses w-100-p pl-16 ng-star-inserted" style={{width: '100%', borderColor: 'rgba(0, 0, 0, 0.87)', color: 'rgba(0, 0, 0, 0.87)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '22px', outlineColor: 'rgba(0, 0, 0, 0.87)', outlineWidth: '3px', overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', padding: '0px 0px 0px 16px', textAlign: 'left', textOverflow: 'ellipsis', WebkitTextFillColor: 'rgba(0, 0, 0, 0.87)', WebkitTextStrokeColor: 'rgba(0, 0, 0, 0.87)', whiteSpace: 'nowrap', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}}>
                                                              <span style={{whiteSpace: 'pre-wrap', fontFamily: '\\'Source Sans Pro\\', sans-serif'}}>Manage Licenses</span>
                                                            </span>
                                                          </span>
                                                        </span>
                                                        <div className="mat-focus-indicator" style={{borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', position: 'absolute', textAlign: 'center', whiteSpace: 'break-spaces', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}} />
                                                      </mat-list-item>
                                                    </span>
                                                    <span className="mat-focus-indicator" style={{borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', position: 'absolute', textAlign: 'center', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}} />
                                                    <span className="mat-mdc-button-touch-target" style={{height: '48px', top: '50%', borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', position: 'absolute', textAlign: 'center', transform: 'matrix(1, 0, 0, 1, 0, -24)', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}} />
                                                    <span className="mat-ripple mat-mdc-button-ripple" style={{borderColor: 'rgb(0, 0, 0)', color: 'rgb(0, 0, 0)', display: 'block', fontFamily: '"Source Sans Pro", sans-serif', fontSize: '14px', lineHeight: '19.6px', outlineColor: 'rgb(0, 0, 0)', outlineWidth: '3px', overflow: 'hidden', overflowX: 'hidden', overflowY: 'hidden', position: 'absolute', textAlign: 'center', order: '0', flexGrow: '0', flexShrink: '1', opacity: '1'}} />
                                                  </button>
                                                </div>
"""

HERO_BLOCK = """
                                        <div className="manage-licenses-page-header" style={{display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px', width: '100%'}}>
                                          <div style={{fontFamily: '"Source Sans Pro", sans-serif', fontSize: '20px', fontWeight: '600', lineHeight: 'normal', color: 'rgba(0, 0, 0, 0.87)'}}>Manage Licenses</div>
                                          <div className="manage-licenses-how-it-works" style={{border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '8px', padding: '16px', background: 'radial-gradient(ellipse at 100% 100%, rgb(199, 227, 248) 0%, rgb(252, 249, 237) 67%, rgb(251, 221, 210) 85%, rgb(250, 209, 227) 100%)'}}>
                                            <div style={{display: 'flex', gap: '8px', alignItems: 'flex-start'}}>
                                              <i className="fa-light fa-circle-question s-24" style={{width: '24px', height: '24px', flexShrink: 0}} />
                                              <div style={{display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minWidth: 0}}>
                                                <div style={{fontFamily: '"Source Sans Pro", sans-serif', fontSize: '18px', fontWeight: '600'}}>How it works</div>
                                                <div style={{display: 'flex', flexWrap: 'wrap', gap: '32px 64px'}}>
                                                  <div><strong>1 Add Students</strong><br /><span style={{fontWeight: 400}}>Add or import students</span></div>
                                                  <div><strong>2 Assign Licenses</strong><br /><span style={{fontWeight: 400}}>Allocate the necessary licenses</span></div>
                                                  <div><strong>3 Send Invites</strong><br /><span style={{fontWeight: 400}}>Invite student</span></div>
                                                  <div><strong>4 Activate Account and License</strong><br /><span style={{fontWeight: 400}}>The recipient activates their account</span></div>
                                                </div>
                                                <a href="#know-more" style={{color: 'rgb(63, 81, 181)', fontWeight: 600, fontSize: '14px', textDecoration: 'none'}}>Know more</a>
                                              </div>
                                              <button type="button" aria-label="Dismiss" style={{border: 'none', background: 'transparent', padding: 0, cursor: 'pointer'}}><i className="fa-light fa-circle-xmark s-24" /></button>
                                            </div>
                                          </div>
                                          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap'}}>
                                            <div style={{display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap'}}>
                                              <div className="manage-licenses-stat-no-license" style={{display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '4px', padding: '8px', background: '#fff'}}>
                                                <span className="manage-licenses-stat-count" style={{background: '#ffd4d4', borderRadius: '4px', padding: '2px 10px', color: '#975b00', fontWeight: 600, fontSize: '18px', minWidth: '49px', textAlign: 'center'}}>102</span>
                                                <span style={{fontSize: '14px'}}>Students with no Licenses</span>
                                              </div>
                                              <div className="manage-licenses-stat-unused" style={{display: 'flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(0, 0, 0, 0.12)', borderRadius: '4px', padding: '8px', background: '#fff'}}>
                                                <span className="manage-licenses-stat-count" style={{background: '#fff3cd', borderRadius: '4px', padding: '2px 10px', color: '#975b00', fontWeight: 600, fontSize: '18px', minWidth: '49px', textAlign: 'center'}}>129</span>
                                                <span style={{fontSize: '14px'}}>Unused Licenses</span>
                                              </div>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                              <a href="#track" style={{color: 'rgb(63, 81, 181)', fontWeight: 600, fontSize: '14px', textDecoration: 'none'}}>View and Track License</a>
                                              <button type="button" disabled style={{background: 'rgba(0, 0, 0, 0.1)', border: 'none', borderRadius: '4px', padding: '7px 8px', fontWeight: 600, fontSize: '14px', opacity: 0.5, cursor: 'not-allowed'}}>Bulk Assign License</button>
                                            </div>
                                          </div>
                                        </div>
"""


def patch_manage_licenses(text: str) -> str:
    text = text.replace(
        "StepsExxatComAdminProfileConfigurationInviteStudent1440WDefault",
        "StepsExxatComAdminProfileConfigurationManageLicenses1440WDefault",
    )
    text = text.replace("plugin-invite-student", "plugin-manage-licenses")
    text = text.replace("settings-invitestudent-", "settings-managelicenses-")
    text = text.replace("contextualHelpInviteStudent", "contextualHelpManageLicenses")

    # Sidebar: insert Manage Licenses before Invite Student; Invite Student inactive
    invite_marker = '<button id="SetUpinvite-student"'
    if invite_marker not in text:
        raise SystemExit("Invite Student sidebar marker not found")
    text = text.replace(
        invite_marker,
        MANAGE_LICENSES_SIDEBAR.strip() + "\n                                                  " + invite_marker,
        1,
    )
    text = text.replace(
        '<button id="SetUpinvite-student" className="p-0 w-100-p parent mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base active-item-class"',
        '<button id="SetUpinvite-student" className="p-0 w-100-p parent mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"',
        1,
    )
    text = text.replace(
        '<button id="SetUpinvite-student" className="p-0 w-100-p parent mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base active-item-class"',
        '<button id="SetUpinvite-student" className="p-0 w-100-p parent mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base"',
        1,
    )
    text = text.replace(
        '<button id="SetUpmanage-licenses" className="p-0 w-100-p parent mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base active-item-class" style={{width: \'100%\', alignItems: \'center\', borderColor:',
        '<button id="SetUpmanage-licenses" className="p-0 w-100-p parent mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base active-item-class" style={{width: \'100%\', alignItems: \'center\', backgroundColor: \'rgba(0, 0, 0, 0.1)\', borderColor:',
        1,
    )
    text = text.replace(
        "id=\"SetUpmanage-licenses\" className=\"p-0 w-100-p parent mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base active-item-class\" style={{width: '100%', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderColor: 'rgb(0, 0, 0) rgb(0, 0, 0) rgb(0, 0, 0) rgb(255, 255, 255)'",
        "id=\"SetUpmanage-licenses\" className=\"p-0 w-100-p parent mdc-button mat-mdc-button mat-unthemed mat-mdc-button-base active-item-class\" style={{width: '100%', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.1)', borderColor: 'rgb(0, 0, 0) rgb(0, 0, 0) rgb(0, 0, 0) rgb(63, 81, 181)'",
        1,
    )

    # Hero before table card
    page_layout_marker = '<div className="page-layout carded fullwidth full-width-page inner-scroll exxat-new-grid p-0"'
    text = text.replace(page_layout_marker, HERO_BLOCK.strip() + "\n                                        " + page_layout_marker, 1)

    # Remove filter chips row in toolbar (keep search + export/filter icons)
    text = re.sub(
        r'<div className="px-16 w-100-p ng-star-inserted" style=\{\{width: \'100%\'.*?<\/div>\s*<\/div>\s*<div style=\{\{alignContent:',
        '</div>\n                                                      <div style={{alignContent:',
        text,
        count=1,
        flags=re.DOTALL,
    )

    # Replace invite CTA with license actions
    text = re.sub(
        r'<profile-admin-student-invitation className="ng-star-inserted".*?</profile-admin-student-invitation>',
        """<div className="manage-licenses-toolbar-actions ng-star-inserted" style={{display: 'flex', alignItems: 'center', gap: '16px'}}>
                                                          <a href="#track" style={{color: 'rgb(63, 81, 181)', fontWeight: 600, fontSize: '14px', textDecoration: 'none', whiteSpace: 'nowrap'}}>View and Track License</a>
                                                          <button type="button" disabled className="mdc-button mdc-button--outlined mat-mdc-outlined-button mat-mdc-button-disabled" style={{height: '32px', opacity: 0.5}}>
                                                            <span className="mdc-button__label"><span style={{fontWeight: 600, fontSize: '14px'}}>Bulk Assign License</span></span>
                                                          </button>
                                                        </div>""",
        text,
        count=1,
        flags=re.DOTALL,
    )

    text = text.replace("1600 Results Found", "2349 Results")
    text = text.replace("Student Name", "Student")

    replacements = [
        ("SSO Key", "Group"),
        ('>Status<', ">Student Category<"),
        ("Invitation Status", "Approve License Details"),
        ("Account Status", "Campus"),
        ("Activation Date", "Action"),
        (">Email<", ">Clinical Education License Details<"),
    ]
    for old, new in replacements:
        text = text.replace(old, new)

    # Demo row values for first visible row
    text = text.replace("Not Available", "Not Available", 1)
    first_row_replacements = [
        ("William, Bonham", "Ann Lubin"),
        ("wbonham@exxat.testinator.com", "ann@school.com"),
        ("Mohini R38", "Class of 2026"),
        ("Unassigned", "Group-A"),
        (">Active<", ">Category-A<", 1),
        ("Not Invited", "Not Available"),
        ("Not Activated", "East"),
    ]
    for item in first_row_replacements:
        if len(item) == 2:
            old, new = item
            text = text.replace(old, new, 1)
        else:
            old, new, count = item
            text = text.replace(old, new, count)

    return text


def patch_invite_student_sidebar(text: str) -> str:
    """Add Manage Licenses nav link to Invite Student screen (inactive)."""
    if 'id="SetUpmanage-licenses"' in text:
        return text
    invite_marker = '<button id="SetUpinvite-student"'
    return text.replace(
        invite_marker,
        INVITE_SIDEBAR_INACTIVE.strip() + "\n                                                  " + invite_marker,
        1,
    )


def main() -> None:
    src_text = SRC.read_text(encoding="utf-8")
    DEST.write_text(patch_manage_licenses(src_text), encoding="utf-8")
    SRC.write_text(patch_invite_student_sidebar(src_text), encoding="utf-8")
    print(f"Wrote {DEST.relative_to(ROOT)}")
    print(f"Updated sidebar in {SRC.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
