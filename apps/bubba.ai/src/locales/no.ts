export default {
  language: {
    title: "Språk",
    description: "Endre språket som brukes i brukergrensesnittet.",
    placeholder: "Velg språk",
  },
  languages: {
    en: "Engelsk",
  },
  header: {
    feedback: {
      button: "Tilbakemelding",
      title: "Takk for din tilbakemelding!",
      description: "Vi kommer tilbake til deg så snart som mulig",
      placeholder:
        "Ideer for å forbedre denne siden eller problemer du opplever.",
      send: "Send tilbakemelding",
      success: "Takk for din tilbakemelding!",
      error: "Feil ved sending av tilbakemelding - prøv igjen?",
    },
  },
  theme: {
    options: {
      light: "Lys",
      dark: "Mørk",
      system: "Systemet",
    },
  },
  sidebar: {
    overview: "Oversikt",
    risk: "Risiko",
    settings: "Innstillinger",
  },
  auth: {
    title: "Automatiser SOC 2, ISO 27001 og GDPR-samsvar med AI.",
    description:
      "Opprett en gratis konto eller logg inn med en eksisterende konto for å fortsette.",
    options: "Flere alternativer",
    google: "Fortsett med Google",
    email: {
      description: "Skriv inn din e-postadresse for å fortsette.",
      placeholder: "Skriv inn e-postadresse",
      button: "Fortsett med e-post",
      magic_link_sent: "Magisk lenke sendt",
      magic_link_description: "Sjekk din e-post for en magisk lenke.",
      magic_link_try_again: "Prøv igjen.",
      success: "E-post sendt - sjekk e-posten!",
      error: "Feil ved sending av e-post - prøv igjen?",
    },
    terms:
      "Ved å klikke fortsett bekrefter du at du har lest og godtar vilkårene for bruk og personvernerklæringen.",
  },
  risk: {
    risks: "risikoer",
    dashboard: {
      title: "Dashbord",
      risk_status: "Risiko Status",
      risks_by_department: "Risikoer per avdeling",
      risks_by_assignee: "Risikoer per ansvarlig",
      risk_status_chart: {
        open: "Åpen",
        pending: "Ventende",
        closed: "Lukket",
        archived: "Arkivert",
      },
    },
    register: {
      title: "Risikoregister",
      table: {
        risk: "Risiko",
        status: "Status",
        department: "Avdeling",
        assigned_to: "Tildelt til",
        no_results: "Ingen resultater",
        no_risks: "Ingen risikoer funnet",
        clear_filters: "Fjern filtre",
      },
      filters: {
        search: "Søk etter risikoer...",
        status: "Status",
        department: "Avdeling",
        clear: "Fjern filtre",
        create: "Opprett risiko",
      },
      empty: {
        no_results: {
          title: "Ingen resultater",
          description_filtered: "Prøv et annet søk, eller juster filtrene",
          description_no_risks: "Det er ingen risikoer opprettet ennå",
        },
        no_risks: {
          title: "Opprett en risiko for å komme i gang",
          description:
            "Spor og vurder risikoer, opprett og tildel risikoreduserende tiltak for teamet ditt, og administrer risikoregisteret ditt i ett enkelt grensesnitt.",
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
        "Dette er offisielt nettstedet til din organisasjon. Sørg for at du inkluderer hele URLen med https://.",
      org_website_tip: "Skriv inn en gyldig URL med https://",
      org_website_error: "Feil ved oppdatering av organisasjonsnettsted",
      org_website_updated: "Organisasjonsnettsted oppdatert",
      org_delete: "Slett organisasjon",
      org_delete_description:
        "Permanent fjern din organisasjon og all innhold fra Bubba AI-plattformen. Denne handlingen er ikke reversibel - vennligst fortsatt med forsiktighet.",
      org_delete_alert_title: "Er du helt sikker?",
      org_delete_alert_description:
        "Denne handlingen kan ikke angres. Denne handlingen vil permanent slette din organisasjon og fjerne data fra våre servere.",
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
  overview: {
    title: "Oversikt",
    framework_chart: {
      title: "Rammeverksframgang",
    },
    requirement_chart: {
      title: "Kravstatus",
      not_started: "Ikke startet",
      in_progress: "Under arbeid",
      compliant: "Tilfredsstiller",
    },
  },
  user_menu: {
    theme: "Tema",
    language: "Språk",
    sign_out: "Logg ut",
    account: "Konto",
    support: "Støtte",
    settings: "Innstillinger",
    teams: "Teams",
  },
} as const;
