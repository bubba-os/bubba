export default {
  language: {
    title: "Languages",
    description: "Change the language used in the user interface.",
    placeholder: "Select language",
  },
  languages: {
    en: "English",
    no: "Norsk",
  },
  header: {
    feedback: {
      button: "Feedback",
      title: "Thank you for your feedback!",
      description: "We will be back with you as soon as possible",
      placeholder: "Ideas to improve this page or issues you are experiencing.",
      send: "Send",
      success: "Thank you for your feedback!",
      error: "Error sending feedback - try again?",
    },
  },
  theme: {
    options: {
      light: "Light",
      dark: "Dark",
      system: "System",
    },
  },
  sidebar: {
    overview: "Overview",
    risk: "Risk",
    settings: "Settings",
  },
  common: {
    save: "Save",
    edit: "Edit",
  },
  auth: {
    title: "Automate SOC 2, ISO 27001 and GDPR compliance with AI.",
    description:
      "Create a free account or log in with an existing account to continue.",
    options: "More options",
    google: "Continue with Google",
    email: {
      description: "Enter your email address to continue.",
      placeholder: "Enter email address",
      button: "Continue with email",
      magic_link_sent: "Magic link sent",
      magic_link_description: "Check your inbox for a magic link.",
      magic_link_try_again: "Try again.",
      success: "Email sent - check your inbox!",
      error: "Error sending email - try again?",
    },
    terms:
      "By clicking continue, you acknowledge that you have read and agree to the Terms of Service and Privacy Policy.",
  },
  overview: {
    title: "Overview",
    framework_chart: {
      title: "Framework Progress",
    },
    requirement_chart: {
      title: "Requirement Status",
      not_started: "Not Started",
      in_progress: "In Progress",
      compliant: "Compliant",
    },
  },
  risk: {
    risks: "risks",
    vendor: {
      title: "Vendor Management",
    },
    dashboard: {
      title: "Dashboard",
      risk_status: "Risk Status",
      risks_by_department: "Risks by Department",
      risks_by_assignee: "Risks by Assignee",
      risk_status_chart: {
        open: "Open",
        pending: "Pending",
        closed: "Closed",
        archived: "Archived",
      },
      inherent_risk_description:
        "Inherent risk is calculated as likelihood * impact. This is the risk level before any controls are applied.",
      residual_risk_description:
        "Residual risk is calculated as likelihood * impact. This is the risk level after controls are applied.",
      risk_assessment_description: "Compare inherent and residual risk levels",
    },
    register: {
      title: "Risk Register",
      table: {
        risk: "Risk",
        status: "Status",
        department: "Department",
        assigned_to: "Assigned To",
        no_results: "No results",
        no_risks: "No risks found",
        clear_filters: "Clear filters",
      },
      filters: {
        search: "Search risks...",
        status: "Status",
        department: "Department",
        clear: "Clear filters",
        create: "Create risk",
        owner: "Filter by owner",
        owner_placeholder: "Filter by owner",
      },
      empty: {
        no_results: {
          title: "No results",
          description_filtered: "Try another search, or adjusting the filters",
          description_no_risks: "There are no risks created yet",
        },
        no_risks: {
          title: "Create a risk to get started",
          description:
            "Track and score risks, create and assign mitigation tasks for your team, and manage your risk register all in one simple interface.",
        },
      },
      pagination: {
        of: "of",
        items_per_page: "Items per page",
      },
      statuses: {
        open: "Open",
        pending: "Pending",
        closed: "Closed",
        archived: "Archived",
      },
    },
    metrics: {
      probability: "Probability",
      impact: "Impact",
      inherentRisk: "Inherent Risk",
      residualRisk: "Residual Risk",
    },
    chart: {
      riskScore: "Risk Score",
      inherentRisk: "Inherent Risk",
      residualRisk: "Residual Risk",
    },
    form: {
      update_inherent_risk: "Save Inherent Risk",
      update_inherent_risk_description:
        "Update the inherent risk of the risk. This is the risk level before any controls are applied.",
      update_inherent_risk_success: "Inherent risk updated successfully",
      update_inherent_risk_error: "Failed to update inherent risk",
      update_residual_risk: "Save Residual Risk",
      update_residual_risk_description:
        "Update the residual risk of the risk. This is the risk level after controls are applied.",
      update_residual_risk_success: "Residual risk updated successfully",
      update_residual_risk_error: "Failed to update residual risk",
      update_risk: "Update Risk",
      update_risk_description: "Update the risk title or description.",
      update_risk_success: "Risk updated successfully",
      update_risk_error: "Failed to update risk",
    },
    actions: {
      edit_inherent_risk: "Edit Inherent Risk",
      edit_residual_risk: "Edit Residual Risk",
    },
    tasks: {
      title: "Tasks",
      table: {
        title: "Task",
        status: "Status",
        assigned_to: "Assigned To",
        due_date: "Due Date",
      },
      filters: {
        search: "Search tasks...",
        status: "Status",
        clear: "Clear filters",
        create: "Create task",
        owner: "Filter by owner",
        owner_placeholder: "Filter by owner",
      },
      empty: {
        title: "No results",
        description_filtered: "Try another search, or adjusting the filters",
        description_no_tasks: "There are no tasks created yet",
        create: "Create Task",
        description_create:
          "Create a mitigation task for this risk, add a treatment plan, and assign it to a team member.",
      },
      sheet: {
        title: "Create Task",
        update: "Update Task",
        update_description: "Update the task title or description.",
      },
      statuses: {
        open: "Open",
        pending: "Pending",
        closed: "Closed",
        archived: "Archived",
      },
    },
  },
  settings: {
    general: {
      title: "General",
      org_name: "Organization name",
      org_name_description:
        "This is your organizations visible name. You should use the legal name of your organization.",
      org_name_tip: "Please use 32 characters at maximum.",
      org_website: "Organization Website",
      org_website_description:
        "This is your organization's official website URL. Make sure to include the full URL with https://.",
      org_website_tip: "Please enter a valid URL including https://",
      org_website_error: "Error updating organization website",
      org_website_updated: "Organization website updated",
      org_delete: "Delete organization",
      org_delete_description:
        "Permanently remove your organization and all of its contents from the Bubba AI platform. This action is not reversible - please continue with caution.",
      org_delete_alert_title: "Are you absolutely sure?",
      org_delete_alert_description:
        "This action cannot be undone. This will permanently delete your organization and remove your data from our servers.",
      org_delete_error: "Error deleting organization",
      org_delete_success: "Organization deleted",
      org_name_updated: "Organization name updated",
      org_name_error: "Error updating organization name",
      save_button: "Save",
      delete_button: "Delete",
      delete_confirm: "DELETE",
      delete_confirm_tip: "Type DELETE to confirm.",
      cancel_button: "Cancel",
    },
    members: {
      title: "Members",
    },
    billing: {
      title: "Billing",
    },
  },
  user_menu: {
    theme: "Theme",
    language: "Language",
    sign_out: "Sign out",
    account: "Account",
    support: "Support",
    settings: "Settings",
    teams: "Teams",
  },
} as const;
