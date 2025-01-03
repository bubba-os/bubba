export const soc2Framework = {
  name: "SOC 2",
  description: "SOC 2 Framework",
  version: "2022",
};

export const soc2Categories = [
  {
    name: "CC1: Control Environment",
    code: "CC1",
    description:
      "This criterion assesses the organization's commitment to ethical values, governance, and integrity.",
  },
  {
    name: "CC2: Communications and Information",
    code: "CC2",
    description:
      "This criterion ensures that the organization has an unimpeded flow of information to support its security efforts.",
  },
  {
    name: "CC3: Risk Assessment",
    code: "CC3",
    description:
      "This criterion ensures that the organization has a process for identifying, assessing, and managing risks to its security posture.",
  },
  {
    name: "CC4: Monitoring Controls",
    code: "CC4",
    description:
      "This criterion ensures that the organization has a process for monitoring and testing its security posture.",
  },
  {
    name: "CC5: Control Activities",
    code: "CC5",
    description:
      "This criterion ensures that the organization has a process for controlling its security posture.",
  },
  {
    name: "CC6: Logical and Physical Access Controls",
    code: "CC6",
    description:
      "This criterion ensures that the organization has a process for controlling access to its security posture.",
  },
  {
    name: "CC7: System Operations",
    code: "CC7",
    description:
      "This criterion ensures that the organization has a process for operating its systems and information.",
  },
  {
    name: "CC8: Change Management",
    code: "CC8",
    description:
      "This criterion ensures that the organization has a process for managing changes to its security posture.",
  },
  {
    name: "CC9: Risk Mitigation",
    code: "CC9",
    description:
      "This criterion ensures that the organization has a process for mitigating risks to its security posture.",
  },
];

export const soc2Controls = [
  {
    code: "CC1.1",
    name: "Board Oversight",
    description:
      "The board of directors demonstrates independence from management and exercises oversight of the development and performance of internal control.",
    categoryId: "CC1",
    requiredArtifactTypes: ["policy", "procedure"],
  },
  {
    code: "CC1.2",
    name: "Management Philosophy",
    description:
      "Management establishes, with board oversight, structures, reporting lines, and appropriate authorities and responsibilities in the pursuit of objectives.",
    categoryId: "CC1",
    requiredArtifactTypes: ["policy", "procedure"],
  },
  {
    code: "CC1.3",
    name: "Organizational Structure",
    description:
      "The organization demonstrates a commitment to attract, develop, and retain competent individuals in alignment with objectives.",
    categoryId: "CC1",
    requiredArtifactTypes: ["policy", "procedure"],
  },
  {
    code: "CC1.4",
    name: "Personnel Policies",
    description:
      "The organization holds individuals accountable for their internal control responsibilities in the pursuit of objectives.",
    categoryId: "CC1",
    requiredArtifactTypes: ["policy", "procedure", "training"],
  },
  {
    code: "CC1.5",
    name: "Code of Conduct",
    description:
      "The organization demonstrates a commitment to integrity and ethical values.",
    categoryId: "CC1",
    requiredArtifactTypes: ["policy", "training"],
  },

  // CC2: Communication and Information
  {
    code: "CC2.1",
    name: "Information Quality",
    description:
      "The organization obtains or generates and uses relevant, quality information to support the functioning of internal control.",
    categoryId: "CC2",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC2.2",
    name: "Internal Communication",
    description:
      "The organization internally communicates information, including objectives and responsibilities for internal control.",
    categoryId: "CC2",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC2.3",
    name: "External Communication",
    description:
      "The organization communicates with external parties regarding matters affecting the functioning of internal control.",
    categoryId: "CC2",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },

  // CC3: Risk Assessment
  {
    code: "CC3.1",
    name: "Risk Assessment Process",
    description:
      "The organization specifies objectives with sufficient clarity to enable the identification and assessment of risks relating to objectives.",
    categoryId: "CC3",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC3.2",
    name: "Risk Identification",
    description:
      "The organization identifies risks to the achievement of its objectives across the entity and analyzes risks as a basis for determining how the risks should be managed.",
    categoryId: "CC3",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC3.3",
    name: "Fraud Risk Assessment",
    description:
      "The organization considers the potential for fraud in assessing risks to the achievement of objectives.",
    categoryId: "CC3",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC3.4",
    name: "Change Management Risk",
    description:
      "The organization identifies and assesses changes that could significantly impact the system of internal control.",
    categoryId: "CC3",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },

  // CC4: Monitoring Activities
  {
    code: "CC4.1",
    name: "Control Monitoring",
    description:
      "The organization selects, develops, and performs ongoing and/or separate evaluations to ascertain whether the components of internal control are present and functioning.",
    categoryId: "CC4",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC4.2",
    name: "Deficiency Management",
    description:
      "The organization evaluates and communicates internal control deficiencies in a timely manner to those parties responsible for taking corrective action.",
    categoryId: "CC4",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },

  // CC5: Control Activities
  {
    code: "CC5.1",
    name: "Control Selection",
    description:
      "The organization selects and develops control activities that contribute to the mitigation of risks to the achievement of objectives to acceptable levels.",
    categoryId: "CC5",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC5.2",
    name: "Technology Controls",
    description:
      "The organization selects and develops general control activities over technology to support the achievement of objectives.",
    categoryId: "CC5",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC5.3",
    name: "Policy Implementation",
    description:
      "The organization deploys control activities through policies that establish what is expected and procedures that put policies into action.",
    categoryId: "CC5",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },

  // CC6: Logical and Physical Access Controls
  {
    code: "CC6.1",
    name: "Access Security",
    description:
      "The organization implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events.",
    categoryId: "CC6",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC6.2",
    name: "Access Authentication",
    description:
      "Prior to issuing system credentials and granting system access, the organization registers and authorizes new internal and external users.",
    categoryId: "CC6",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC6.3",
    name: "Access Removal",
    description:
      "The organization removes access to protected information assets when appropriate.",
    categoryId: "CC6",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC6.4",
    name: "Access Review",
    description:
      "The organization evaluates and manages access to protected information assets on a periodic basis.",
    categoryId: "CC6",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC6.5",
    name: "System Account Management",
    description:
      "The organization identifies and authenticates system users, devices, and other systems before allowing access.",
    categoryId: "CC6",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC6.6",
    name: "Access Restrictions",
    description:
      "The organization restricts physical access to facilities and protected information assets.",
    categoryId: "CC6",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC6.7",
    name: "Information Asset Changes",
    description:
      "The organization manages changes to system components to minimize the risk of unauthorized changes.",
    categoryId: "CC6",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC6.8",
    name: "Malicious Software Prevention",
    description:
      "The organization implements controls to prevent or detect and act upon the introduction of unauthorized or malicious software.",
    categoryId: "CC6",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },

  // CC7: System Operations
  {
    code: "CC7.1",
    name: "Infrastructure Monitoring",
    description:
      "To detect and act upon security events in a timely manner, the organization monitors system capacity, security threats, changing regulatory requirements, and other system vulnerabilities.",
    categoryId: "CC7",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC7.2",
    name: "Security Event Response",
    description:
      "The organization designs, develops, and implements policies and procedures to respond to security incidents and breaches.",
    categoryId: "CC7",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC7.3",
    name: "Security Event Recovery",
    description:
      "The organization implements recovery procedures to ensure timely restoration of systems or assets affected by security incidents.",
    categoryId: "CC7",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC7.4",
    name: "Security Event Analysis",
    description:
      "The organization implements incident response activities to identify root causes of security incidents and develop remediation plans.",
    categoryId: "CC7",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },

  // CC8: Change Management
  {
    code: "CC8.1",
    name: "Change Authorization",
    description:
      "The organization authorizes, designs, develops or acquires, configures, documents, tests, approves, and implements changes to infrastructure, data, software, and procedures.",
    categoryId: "CC8",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },

  // CC9: Risk Mitigation
  {
    code: "CC9.1",
    name: "Business Continuity Planning",
    description:
      "The organization identifies, develops, and implements activities to recover critical information technology resources.",
    categoryId: "CC9",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
  {
    code: "CC9.2",
    name: "Vendor Risk Management",
    description:
      "The organization assesses and manages risks associated with vendors and business partners.",
    categoryId: "CC9",
    requiredArtifactTypes: ["policy", "procedure", "evidence"],
  },
];

export const soc2RequiredArtifacts = [
  {
    name: "Information Security Policy",
    description:
      "Master policy that outlines the organization's approach to information security management",
    controls: ["CC1.1", "CC1.2", "CC1.3", "CC1.4", "CC1.5"],
    department: "it",
    subPolicies: [
      {
        name: "Access Control Policy",
        department: "it",
        description:
          "Defines standards for logical and physical access management",
      },
      {
        name: "Data Classification Policy",
        department: "it",
        description: "Defines data classification and handling requirements",
      },
      {
        name: "Security Awareness and Training Policy",
        department: "it",
        description: "Defines requirements for security awareness and training",
      },
      {
        name: "Incident Response Policy",
        department: "it",
        description:
          "Defines procedures for detecting, responding to, and recovering from security incidents",
      },
      {
        name: "Change Management Policy",
        department: "it",
        description:
          "Establishes requirements for managing changes to systems and infrastructure",
      },
    ],
  },
  {
    name: "Communications Policy",
    description:
      "Defines requirements for internal and external communications",
    controls: ["CC2.1", "CC2.2", "CC2.3"],
    department: "admin",
    subPolicies: [
      {
        name: "Internal Communications Policy",
        department: "admin",
        description: "Defines requirements for internal communications",
      },
      {
        name: "External Communications Policy",
        department: "admin",
        description: "Defines requirements for external communications",
      },
    ],
  },
  {
    name: "Access Control Policy",
    description: "Defines standards for logical and physical access management",
    controls: ["CC6.1", "CC6.2", "CC6.3", "CC6.4", "CC6.5", "CC6.6"],
    department: "it",
    subPolicies: [
      {
        name: "Password Policy",
        department: "it",
        description: "Defines password requirements and management",
      },
      {
        name: "Remote Access Policy",
        department: "it",
        description: "Defines requirements for remote access to systems",
      },
      {
        name: "Mobile Device Policy",
        department: "it",
        description: "Defines requirements for mobile devices",
      },
    ],
  },
  {
    name: "Data Protection Policy",
    description:
      "Outlines requirements for data handling, encryption, and protection",
    department: "it",
    controls: ["CC6.1", "CC6.7", "CC6.11"],
    subPolicies: [
      {
        name: "Data Retention Policy",
        department: "it",
        description: "Defines data retention requirements",
      },
      {
        name: "Data Backup Policy",
        department: "it",
        description: "Defines data backup requirements",
      },
      "Encryption Policy",
    ],
  },
  {
    name: "Risk Management Policy",
    description:
      "Defines processes for risk assessment, monitoring, and mitigation",
    department: "it",
    controls: ["CC3.1", "CC3.2", "CC3.3", "CC3.4", "CC9.1", "CC9.2"],
    subPolicies: [
      {
        name: "Vendor Risk Management Policy",
        department: "it",
        description: "Defines requirements for managing third-party vendors",
      },
      {
        name: "Business Continuity Policy",
        department: "admin",
        description: "Defines requirements for maintaining business operations",
      },
      {
        name: "Disaster Recovery Policy",
        department: "it",
        description: "Defines requirements for disaster recovery",
      },
    ],
  },
  {
    name: "Change Management Policy",
    description:
      "Establishes requirements for managing changes to systems and infrastructure",
    controls: ["CC6.7", "CC8.1", "CC8.2", "CC8.3"],
    department: "it",
    subPolicies: [
      {
        name: "Software Development Lifecycle Policy",
        department: "it",
        description: "Defines requirements for software development",
      },
      {
        name: "Configuration Management Policy",
        department: "it",
        description: "Defines requirements for configuration management",
      },
    ],
  },
  {
    name: "Incident Response Policy",
    description:
      "Defines procedures for detecting, responding to, and recovering from security incidents",
    controls: ["CC7.1", "CC7.2", "CC7.3", "CC7.4"],
    subPolicies: [
      {
        name: "Security Event Management Policy",
        department: "it",
        description: "Defines procedures for managing security events",
      },
      {
        name: "Business Continuity Policy",
        department: "admin",
        description: "Defines requirements for maintaining business operations",
      },
      {
        name: "Disaster Recovery Policy",
        department: "it",
        description: "Defines requirements for disaster recovery",
      },
    ],
  },
  {
    name: "Acceptable Use Policy",
    description: "Defines acceptable use of information systems and assets",
    controls: ["CC1.4", "CC1.5", "CC5.3"],
    department: "hr",
    subPolicies: [
      {
        name: "Email Usage Policy",
        department: "hr",
        description: "Defines requirements for email usage",
      },
      {
        name: "Internet Usage Policy",
        department: "hr",
        description: "Defines requirements for internet usage",
      },
      {
        name: "Social Media Policy",
        department: "hr",
        description: "Defines requirements for social media usage",
      },
    ],
  },
  {
    name: "Human Resources Security Policy",
    description:
      "Defines security requirements related to employees and contractors",
    controls: ["CC1.1", "CC1.3", "CC1.4", "CC1.5"],
    department: "hr",
    subPolicies: [
      "Background Check Policy",
      "Employee Onboarding Policy",
      "Employee Termination Policy",
    ],
  },
  {
    name: "Asset Management Policy",
    description: "Defines requirements for managing information assets",
    controls: ["CC6.4", "CC6.5", "CC6.7"],
    department: "it",
    subPolicies: [
      "Asset Inventory Policy",
      "Asset Classification Policy",
      "Asset Disposal Policy",
    ],
  },
  {
    name: "Security Architecture Policy",
    description: "Defines security requirements for systems and infrastructure",
    controls: ["CC6.1", "CC6.6", "CC6.8", "CC6.9", "CC6.10", "CC6.11"],
    department: "it",
    subPolicies: [
      "Network Security Policy",
      "Cloud Security Policy",
      "API Security Policy",
    ],
  },
  {
    name: "Business Continuity Policy",
    description: "Defines requirements for maintaining business operations",
    controls: ["CC9.1"],
    subPolicies: [
      "Disaster Recovery Policy",
      "Business Impact Analysis Policy",
      "Crisis Management Policy",
    ],
  },
  {
    name: "Vendor Management Policy",
    description: "Defines requirements for managing third-party vendors",
    controls: ["CC9.2"],
    subPolicies: [
      "Vendor Assessment Policy",
      "Vendor Contracting Policy",
      "Vendor Monitoring Policy",
    ],
  },
  {
    name: "System Development and Maintenance Policy",
    description: "Defines requirements for developing and maintaining systems",
    controls: ["CC8.1", "CC8.2", "CC8.3"],
    subPolicies: [
      "Secure Development Policy",
      "Testing Policy",
      "Release Management Policy",
    ],
  },
  // Detailed Sub-Policies
  {
    name: "Password Policy",
    description: "Defines password requirements and management",
    controls: ["CC6.1", "CC6.2"],
    requirements: [
      "Minimum length and complexity",
      "Password expiration",
      "Password history",
      "Multi-factor authentication requirements",
    ],
  },
  {
    name: "Encryption Policy",
    description:
      "Defines encryption requirements for data at rest and in transit",
    controls: ["CC6.11"],
    requirements: [
      "Encryption algorithms and key lengths",
      "Key management procedures",
      "Certificate management",
    ],
  },
  {
    name: "Remote Access Policy",
    description: "Defines requirements for remote access to systems",
    controls: ["CC6.1", "CC6.2", "CC6.3"],
    requirements: [
      "VPN requirements",
      "Remote device security",
      "Remote access monitoring",
    ],
  },
  {
    name: "Mobile Device Policy",
    description: "Defines requirements for mobile devices",
    controls: ["CC6.1", "CC6.2", "CC6.8"],
    requirements: [
      "Device encryption",
      "Mobile device management",
      "Application security",
    ],
  },
  {
    name: "Network Security Policy",
    description: "Defines network security requirements",
    controls: ["CC6.1", "CC6.6", "CC6.8"],
    requirements: [
      "Network segmentation",
      "Firewall configuration",
      "Network monitoring",
    ],
  },
  {
    name: "Cloud Security Policy",
    description: "Defines security requirements for cloud services",
    controls: ["CC6.9"],
    requirements: [
      "Cloud provider security requirements",
      "Cloud configuration standards",
      "Cloud monitoring requirements",
    ],
  },
  {
    name: "API Security Policy",
    description: "Defines security requirements for APIs",
    controls: ["CC6.10"],
    requirements: ["API authentication", "API authorization", "API monitoring"],
  },
];
