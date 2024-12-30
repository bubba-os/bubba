export default {
  language: {
    title: "Språk",
    description: "Endre språket brukt i brukergrensesnittet.",
    placeholder: "Velg språk",
  },
  languages: {
    en: "Engelsk",
    no: "Norsk",
  },
  header: {
    feedback: {
      button: "Tilbakemelding",
      title: "Takk for tilbakemeldingen!",
      description: "Vi vil være tilbake med deg så snart som mulig",
      placeholder:
        "Ideer for å forbedre denne siden eller problemer du er opplever.",
      send: "Send",
      success: "Takk for tilbakemeldingen!",
      error: "Feil ved sending av tilbakemelding - prøv igjen?",
    },
  },
  theme: {
    options: {
      light: "Lys",
      dark: "Mørk",
      system: "System",
    },
  },
  sidebar: {
    overview: "Oversikt",
    risk: "Risiko",
    settings: "Innstillinger",
  },
  common: {
    save: "Lagre",
    edit: "Rediger",
  },
  auth: {
    title: "Automatiser SOC 2, ISO 27001 og GDPR-samsvar med AI.",
    description:
      "Opprett en gratis konto eller logg inn med en eksisterende konto for å fortsette.",
    options: "Mer alternativer",
    google: "Logg inn med Google",
    email: {
      description: "Skriv inn din e-postadresse for å fortsette.",
      placeholder: "Skriv inn e-postadresse",
      button: "Logg inn med e-post",
      magic_link_sent: "Magisk lenke sendt",
      magic_link_description: "Sjekk e-posten din for en magisk lenke.",
      magic_link_try_again: "Prøv igjen.",
      success: "E-post sendt - sjekk e-posten din!",
      error: "Feil ved sending av e-post - prøv igjen?",
    },
    terms:
      "Ved å klikke på continue, bekrefter du at du har lest og samtykker til vilkårene for tjenesten og personvernpolitisen.",
  },
  overview: {
    title: "Oversikt",
    framework_chart: {
      title: "Framework Progress",
    },
    requirement_chart: {
      title: "Kravstatus",
      not_started: "Ikke startet",
      in_progress: "Under arbeid",
      compliant: "Samsvar",
    },
  },
  risk: {
    risks: "risikoer",
    dashboard: {
      title: "Dashboard",
      risk_status: "Risiko Status",
      risks_by_department: "Risikoer per avdeling",
      risks_by_assignee: "Risikoer per ansvarlig",
      risk_status_chart: {
        open: "Åpen",
        pending: "Ventende",
        closed: "Lukket",
        archived: "Arkivert",
      },
      inherent_risk_description:
        "Inherent risiko er beregnet som sannsynlighet * påvirkning. Dette er risikoen før kontroller er anvendt.",
      residual_risk_description:
        "Residual risiko er beregnet som sannsynlighet * påvirkning. Dette er risikoen etter kontroller er anvendt.",
      risk_assessment_description: "Sammenlign inherent og residual risiko",
    },
    register: {
      title: "Risikoregister",
      table: {
        risk: "Risiko",
        status: "Status",
        department: "Avdeling",
        assigned_to: "Ansvarlig",
        no_results: "Ingen resultater",
        no_risks: "Ingen risikoer funnet",
        clear_filters: "Rydde filtre",
      },
      filters: {
        search: "Søk risikoer...",
        status: "Status",
        department: "Avdeling",
        clear: "Rydde filtre",
        create: "Opprett risiko",
        owner: "Filtrer etter eier",
        owner_placeholder: "Filtrer etter eier",
      },
      empty: {
        no_results: {
          title: "Ingen resultater",
          description_filtered: "Prøv en annen søk eller juster filtrene",
          description_no_risks: "Ingen risikoer opprettet ennå",
        },
        no_risks: {
          title: "Opprett en risiko for å komme i gang",
          description:
            "Spore og score risikoer, opprett og tilordne kontroller for ditt team, og administrer risikoregister i en enkel grensesnitt.",
        },
      },
      pagination: {
        of: "av",
        items_per_page: "Elementer per side",
      },
      statuses: {
        open: "Åpen",
        pending: "Ventende",
        closed: "Lukket",
        archived: "Arkivert",
      },
      metrics: {
        probability: "Sannsynlighet",
        impact: "Påvirkning",
        inherentRisk: "Inherent Risiko",
        residualRisk: "Residual Risiko",
      },
      chart: {
        riskScore: "Risikoscore",
        inherentRisk: "Inherent Risiko",
        residualRisk: "Residual Risiko",
      },
      form: {
        update_inherent_risk: "Oppdater Inherent Risiko",
        update_inherent_risk_description:
          "Oppdater inherent risikoen til risikoen. Dette er risikoen før kontroller er anvendt.",
        update_inherent_risk_success: "Inherent risiko oppdatert",
        update_inherent_risk_error: "Feil ved oppdatering av inherent risiko",
        update_residual_risk: "Oppdater Residual Risiko",
        update_residual_risk_description:
          "Oppdater residual risikoen til risikoen. Dette er risikoen etter kontroller er anvendt.",
        update_residual_risk_success: "Residual risiko oppdatert",
        update_residual_risk_error: "Feil ved oppdatering av residual risiko",
        update_risk: "Oppdater Risiko",
        update_risk_description: "Oppdater risikoens tittel eller beskrivelse.",
        update_risk_success: "Risiko oppdatert",
        update_risk_error: "Feil ved oppdatering av risiko",
      },
      actions: {
        edit_inherent_risk: "Rediger Inherent Risiko",
        edit_residual_risk: "Rediger Residual Risiko",
      },
    },
    settings: {
      general: {
        title: "Generelt",
        org_name: "Organisasjonsnavn",
        org_name_description:
          "Dette er navnet på din organisasjon. Du bør bruke det juridiske navnet på din organisasjon.",
        org_name_tip: "Bruk maks 32 tegn.",
        org_website: "Organisasjonsnettsted",
        org_website_description:
          "Dette er offisielt nettstedet til din organisasjon. Sørg for at det er en fullstendig URL med https://.",
        org_website_tip: "Skriv inn en gyldig URL med https://",
        org_website_error: "Feil ved oppdatering av organisasjonsnettsted",
        org_website_updated: "Organisasjonsnettsted oppdatert",
        org_delete: "Slett organisasjon",
        org_delete_description:
          "Slett denne organisasjonen og alle tilhørende data. Denne handlingen kan ikke angres.",
        org_delete_alert_title: "Er du helt sikker?",
        org_delete_alert_description:
          "Denne handlingen kan ikke angres. Denne handlingen vil slette denne organisasjonen og alle tilhørende data fra Bubba AI-plattformen.",
        org_delete_error: "Feil ved sletting av organisasjon",
        org_delete_success: "Organisasjon slettet",
        org_name_updated: "Organisasjonsnavn oppdatert",
        org_name_error: "Feil ved oppdatering av organisasjonsnavn",
        save_button: "Lagre",
        delete_button: "Slett",
        delete_confirm: "SLETT",
        delete_confirm_tip: "Skriv inn SLETT for å bekrefte.",
        cancel_button: "Avbryt",
      },
      members: {
        title: "Medlemmer",
      },
      billing: {
        title: "Fakturering",
      },
    },
    user_menu: {
      theme: "Tema",
      language: "Språk",
      sign_out: "Logg ut",
      account: "Konto",
      support: "Støtte",
      settings: "Innstillinger",
      teams: "Team",
    },
  },
} as const;
