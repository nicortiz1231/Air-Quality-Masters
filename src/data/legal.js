/**
 * Legal documents: privacy policy, terms of service, accessibility statement.
 *
 * Two rules govern this file, and they are the same rules as company.js.
 *
 * 1. Every statement here has to describe what the site ACTUALLY does. A
 *    privacy policy that lists cookie categories the site does not set is a
 *    lie in the one document a visitor reads specifically to check whether
 *    they are being lied to. This site sets no cookies, runs no analytics and
 *    loads two third parties (a font host and a form relay) — so that is what
 *    the policy says, and nothing more.
 *
 * 2. Anything the business has to honour operationally — the retention
 *    period, the response window — comes from company.js rather than being
 *    written into the prose, so a promise cannot drift out of sync with the
 *    value the rest of the site uses.
 *
 * The terms are the company's own published Terms and Conditions (last revised
 * 2 July 2025), reproduced faithfully. Two things were fixed: the closing
 * "contact us" pointer referenced a URL that served the wrong document, and a
 * section was added making explicit that these terms cover the WEBSITE and not
 * the HVAC work — that is governed by the signed work order. Conflating the
 * two is how a site term ends up accidentally disclaiming a service warranty.
 *
 * NOT LEGAL ADVICE. See GOING-LIVE.md — an attorney should review before this
 * is relied on.
 *
 * Body node shapes:
 *   "string"              → a paragraph
 *   { list: [...] }       → an unordered list
 *   { defs: [[t, d]] }    → a definition list
 *   { note: "string" }    → a callout, for the things people actually need
 */

import { company, fullAddress, hasPublicAddress } from "./company.js";

const CONTACT_BLOCK = [
  { defs: [
    ["Phone", company.phone.display],
    ["Email", company.email],
    // No "Post" row while the street address is withheld — see company.js.
    // Offering an address people cannot write to is worse than offering none.
    ...(hasPublicAddress ? [["Post", `${company.legalName}, ${fullAddress}`]] : []),
  ] },
];

/* ============================================================
   PRIVACY POLICY
   ============================================================ */

export const privacyPolicy = {
  slug: "privacy",
  path: "/privacy",
  title: "Privacy Policy",
  shortTitle: "Privacy",
  updated: company.policiesUpdated.privacy,
  description:
    "What Air Quality Masters collects through this website, why, who else sees it and how to have it deleted. No cookies, no analytics, no advertising trackers.",
  lede:
    "What this website collects, why, who else can see it, and how to have it deleted. It is short because the site does very little — no advertising trackers, no analytics, no cookies.",

  sections: [
    {
      id: "summary",
      heading: "The short version",
      body: [
        {
          list: [
            "This site sets no cookies and runs no analytics or advertising trackers.",
            "The only personal information we collect is what you type into the service request form, or send us by phone or email.",
            "We use it to respond to your request and to carry out the work. We do not sell it, rent it or add you to a marketing list.",
            `Service request details are kept for about ${company.dataRetentionYears} years as a service record, then deleted.`,
            "You can ask us to delete your information at any time.",
          ],
        },
        `This policy covers ${company.url} and is published by ${company.legalName}, an HVAC contractor based in ${company.address.city}, Florida.`,
      ],
    },

    {
      id: "collect",
      heading: "What we collect",
      body: [
        "Information you give us. The service request form asks for your name, phone number, email address, the service address, the type of property, what you need done, how soon you need it, and anything you choose to write in the description box. Everything except the description is needed to schedule a visit — an HVAC call cannot be dispatched without an address and a way to reach you.",
        "Information we receive when you contact us directly. If you call or email, we hold whatever you tell us, along with the number or address you contacted us from.",
        "Technical information from your visit. Our hosting provider records standard web server logs — IP address, browser type, the page requested and the time. These are used for security and to keep the site running. They are not linked to your service request and are not used to build a profile of you.",
        {
          note:
            "We do not ask for and do not want payment card numbers, bank details or Social Security numbers through this website. Never send them by email or through the form.",
        },
      ],
    },

    {
      id: "use",
      heading: "What we use it for",
      body: [
        {
          list: [
            "Responding to your enquiry and scheduling a technician.",
            "Carrying out the work, ordering parts, and keeping a record of what was found and what was done.",
            "Following up about that specific job — a warranty question, a part that came in, a repair that was quoted but not yet approved.",
            "Meeting our legal, tax and insurance obligations.",
          ],
        },
        "That is the complete list. We do not use your information for advertising, we do not build behavioural profiles, and we do not run automated decision-making of any kind.",
      ],
    },

    {
      id: "sharing",
      heading: "Who else sees it",
      body: [
        "Three categories, and no others.",
        {
          defs: [
            [
              "Our form provider",
              "Submissions from the service request form pass through a third-party form relay, which delivers them to our office inbox. The relay handles the message in transit and does not use it for its own purposes.",
            ],
            [
              "Our hosting and email providers",
              "The site is hosted by a commercial hosting provider and our email runs on a commercial mail service. Both necessarily process data in order to serve the site and deliver mail.",
            ],
            [
              "Where the law requires it",
              "We will disclose information if compelled by valid legal process, or where it is necessary to establish or defend a legal claim.",
            ],
          ],
        },
        "We do not sell your personal information. We do not share it with data brokers, lead-generation networks or advertising platforms. If that ever changes, this page changes first and the change is dated.",
      ],
    },

    {
      id: "cookies",
      heading: "Cookies and tracking",
      body: [
        "This site sets no cookies. There is no analytics package, no advertising pixel, no session recording and no cross-site tracking. Nothing is written to your browser's storage.",
        "There is one third-party request: web fonts are loaded from Google Fonts. Requesting a font from Google's servers reveals your IP address and browser to Google in the same way that loading any image from another domain would. It carries no cookie and no identifier. If that matters to you, most browsers and content blockers can block it, and the site remains fully usable — it falls back to the fonts already on your device.",
        {
          note:
            "Because we run no tracking, there is nothing here for a cookie banner to ask you about. The absence of a consent pop-up is not an oversight.",
        },
      ],
    },

    {
      id: "calls",
      heading: "Phone calls, texts and email",
      body: [
        "When you submit the service request form you are asking us to get in touch, and you confirm that we may contact you at the number and email address you gave us about that request. We contact you about your request — a call to confirm a time, a text when the technician is on the way, an email with a quote.",
        "We do not run marketing text campaigns and we do not use automated dialling systems. If you would rather we used one channel and not another, say so in the description box or tell whoever calls, and we will note it on the job.",
        "Message and data rates from your carrier may apply to texts you receive. Reply STOP to any text to stop them, or ask us directly.",
      ],
    },

    {
      id: "retention",
      heading: "How long we keep it",
      body: [
        `Service records — what was wrong, what was done, what was fitted — are kept for about ${company.dataRetentionYears} years. That is not for our benefit: when a part fails eighteen months later, the record is what establishes whether it is under warranty.`,
        "Enquiries that never became jobs are deleted once it is clear they are not going anywhere. Records we are required to keep for tax or insurance purposes are kept for as long as that obligation lasts.",
      ],
    },

    {
      id: "rights",
      heading: "Your choices",
      body: [
        "Contact us using the details below and we will:",
        {
          list: [
            "tell you what information we hold about you",
            "correct anything that is wrong",
            "delete your information, unless we are legally required to keep it",
            "stop contacting you",
          ],
        },
        "We will respond within 30 days. There is no charge.",
        {
          note:
            "Florida's Digital Bill of Rights sets out data rights that apply to very large companies, and a business this size falls well below its thresholds — so strictly, it does not apply to us. We honour these requests anyway. It seems a strange thing to make somebody argue about.",
        },
      ],
    },

    {
      id: "security",
      heading: "Security",
      body: [
        "The site is served over HTTPS, so what you type into the form is encrypted in transit. Access to the inbox that receives requests is limited to the people who schedule and carry out the work.",
        "No system is perfectly secure, and we would rather say so than imply otherwise. If you become aware of a security problem with this site, please tell us at " + company.email + " and we will look at it.",
      ],
    },

    {
      id: "children",
      heading: "Children",
      body: [
        "This site is for people arranging HVAC work on a property, and is not directed at children. We do not knowingly collect information from anyone under 18. If you believe a child has sent us information, contact us and we will delete it.",
      ],
    },

    {
      id: "changes",
      heading: "Changes to this policy",
      body: [
        "If this policy changes, the revision date at the top of the page changes with it. If a change is significant — a new category of data, a new recipient — we will say so plainly at the top of the page rather than hoping the date is noticed.",
      ],
    },

    {
      id: "contact",
      heading: "Contact us",
      body: [
        "Questions about this policy, or a request about your information:",
        ...CONTACT_BLOCK,
      ],
    },
  ],
};

/* ============================================================
   TERMS OF SERVICE
   ============================================================ */

export const termsOfService = {
  slug: "terms",
  path: "/terms",
  title: "Terms & Conditions",
  shortTitle: "Terms",
  updated: company.policiesUpdated.terms,
  description:
    "The terms governing use of the Air Quality Masters website. Terms for HVAC work itself are set out in the written estimate and work order for that job.",
  lede:
    "The terms governing use of this website. They are not the terms of any HVAC work — that is governed by the written estimate and work order you sign, which takes precedence over anything on this page.",

  sections: [
    {
      id: "scope",
      heading: "What these terms cover",
      body: [
        `These Terms and Conditions govern your use of ${company.url} (the "Site"), operated by ${company.legalName}, ${fullAddress} ("we", "us", "our"). By accessing or using the Site you agree to be bound by them. If you do not agree, please do not use the Site.`,
        "Your use of the Site is also subject to our Privacy Policy, which describes what we collect and why.",
        {
          note:
            "These terms cover the website only. Prices, scope of work, warranties and payment terms for any HVAC service are set out in the written estimate and work order for that job. Where the two differ, the signed work order governs. Nothing on this page limits any warranty given in writing for work performed, and nothing on this page is an offer or a binding quote.",
        },
      ],
    },

    {
      id: "definitions",
      heading: "Definitions",
      body: [
        {
          defs: [
            ["Affiliate", "An entity that controls, is controlled by, or is under common control with a party, where “control” means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for the election of directors or other managing authority."],
            ["Company", `${company.legalName}, ${fullAddress}, referred to as “the Company”, “We”, “Us” or “Our”.`],
            ["Country", "Florida, United States."],
            ["Device", "Any device that can access the Service, such as a computer, a phone or a tablet."],
            ["Service", "The Site."],
            ["Third-party Social Media Service", "Any services or content, including data, information, products or services, provided by a third party that may be displayed, included or made available by the Service."],
            ["You", "The individual accessing or using the Service, or the company or other legal entity on behalf of which that individual is acting."],
          ],
        },
      ],
    },

    {
      id: "acknowledgment",
      heading: "Acknowledgment",
      body: [
        "These Terms set out the rights and obligations of all users regarding use of the Service, and form the agreement between you and the Company. They apply to all visitors and users.",
        "You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.",
      ],
    },

    {
      id: "requests",
      heading: "Service requests submitted through the Site",
      body: [
        "Submitting the service request form is a request for us to contact you. It is not a booking, and it does not create a contract for work. A visit is scheduled only once we have confirmed it with you directly.",
        "You agree that the information you provide is accurate and that you are the owner of the property, or are authorised by the owner to arrange work on it.",
        "We aim to respond to every request, but we cannot guarantee delivery of any message sent over the internet, and forms can fail. If your system is down and the matter is urgent, call — do not rely on the form.",
      ],
    },

    {
      id: "content",
      heading: "Content and accuracy",
      body: [
        "The technical and diagnostic information on this Site is general guidance about HVAC systems in South Florida. It is not advice about your specific system, and it is no substitute for an inspection by a qualified technician. Do not rely on it to decide whether equipment is safe to operate.",
        "We try to keep the Site accurate and current, but we do not warrant that it is free of errors or omissions.",
        "All content on the Site, including text, layout, graphics and code, is owned by the Company or its licensors and is protected by copyright. You may not reproduce it for commercial purposes without written permission.",
      ],
    },

    {
      id: "links",
      heading: "Links to other websites",
      body: [
        "The Service may contain links to third-party websites or services that are not owned or controlled by the Company.",
        "The Company has no control over, and assumes no responsibility for, the content, privacy policies or practices of any third-party websites or services. You acknowledge and agree that the Company shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.",
        "We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.",
      ],
    },

    {
      id: "termination",
      heading: "Termination",
      body: [
        "We may terminate or suspend your access immediately, without prior notice or liability, for any reason, including if you breach these Terms and Conditions. Upon termination, your right to use the Service will cease immediately.",
      ],
    },

    {
      id: "liability",
      heading: "Limitation of liability",
      body: [
        "Notwithstanding any damages that you might incur, the entire liability of the Company and any of its suppliers under any provision of these Terms, and your exclusive remedy for all of the foregoing, shall be limited to the amount actually paid by you through the Service, or 100 USD if you have not purchased anything through the Service.",
        "To the maximum extent permitted by applicable law, in no event shall the Company or its suppliers be liable for any special, incidental, indirect or consequential damages whatsoever, including but not limited to damages for loss of profits, loss of data or other information, business interruption, personal injury or loss of privacy arising out of or in any way related to the use of or inability to use the Service, third-party software or third-party hardware used with the Service, or otherwise in connection with any provision of these Terms, even if the Company or any supplier has been advised of the possibility of such damages and even if the remedy fails of its essential purpose.",
        "Some states do not allow the exclusion of implied warranties or the limitation of liability for incidental or consequential damages, which means that some of the above limitations may not apply. In those states, each party's liability will be limited to the greatest extent permitted by law.",
        {
          note:
            "This section limits liability arising from the website. It does not limit our liability for HVAC work performed, which is governed by the work order and by Florida law.",
        },
      ],
    },

    {
      id: "disclaimer",
      heading: "“As is” and “as available” disclaimer",
      body: [
        "The Service is provided to you “as is” and “as available”, with all faults and defects and without warranty of any kind. To the maximum extent permitted under applicable law, the Company, on its own behalf and on behalf of its Affiliates and its and their respective licensors and service providers, expressly disclaims all warranties, whether express, implied, statutory or otherwise, with respect to the Service, including all implied warranties of merchantability, fitness for a particular purpose, title and non-infringement, and warranties that may arise out of course of dealing, course of performance, usage or trade practice.",
        "Without limiting the foregoing, the Company makes no representation or warranty of any kind, express or implied: as to the operation or availability of the Service, or the information, content and materials included on it; that the Service will be uninterrupted or error-free; as to the accuracy, reliability or currency of any information or content provided through the Service; or that the Service, its servers, the content, or emails sent from or on behalf of the Company are free of viruses, scripts, trojan horses, worms, malware, timebombs or other harmful components.",
        "Some jurisdictions do not allow the exclusion of certain types of warranties or limitations on a consumer's applicable statutory rights, so some or all of the above exclusions and limitations may not apply to you. In that case the exclusions and limitations in this section shall apply to the greatest extent enforceable under applicable law.",
      ],
    },

    {
      id: "law",
      heading: "Governing law and disputes",
      body: [
        "The laws of the State of Florida, United States, excluding its conflict of law rules, govern these Terms and your use of the Service. Your use of the Service may also be subject to other local, state, national or international laws.",
        "If you have any concern or dispute about the Service, you agree to first try to resolve it informally by contacting us. Most things are settled with a phone call.",
      ],
    },

    {
      id: "eu-users",
      heading: "For European Union (EU) users",
      body: [
        "If you are a European Union consumer, you will benefit from any mandatory provisions of the law of the country in which you are resident.",
      ],
    },

    {
      id: "compliance",
      heading: "United States legal compliance",
      body: [
        "You represent and warrant that you are not located in a country subject to a United States government embargo or designated by the United States government as a “terrorist supporting” country, and that you are not listed on any United States government list of prohibited or restricted parties.",
      ],
    },

    {
      id: "severability",
      heading: "Severability and waiver",
      body: [
        "If any provision of these Terms is held to be unenforceable or invalid, that provision will be changed and interpreted to accomplish its objectives to the greatest extent possible under applicable law, and the remaining provisions will continue in full force and effect.",
        "Except as provided in these Terms, a failure to exercise a right or to require performance of an obligation shall not affect a party's ability to exercise that right or require that performance at any time afterwards, nor shall the waiver of a breach constitute a waiver of any subsequent breach.",
      ],
    },

    {
      id: "translation",
      heading: "Translation",
      body: [
        "These Terms and Conditions may have been translated if we have made them available to you on our Service. You agree that the original English text shall prevail in the case of a dispute.",
      ],
    },

    {
      id: "changes",
      heading: "Changes to these terms",
      body: [
        "We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will make reasonable efforts to provide at least 30 days' notice before the new terms take effect. What constitutes a material change is determined at our sole discretion.",
        "By continuing to access or use the Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, in whole or in part, please stop using the Site and the Service.",
      ],
    },

    {
      id: "contact",
      heading: "Contact us",
      body: [
        "Questions about these Terms and Conditions:",
        ...CONTACT_BLOCK,
      ],
    },
  ],
};

/* ============================================================
   ACCESSIBILITY STATEMENT
   ============================================================ */

export const accessibilityStatement = {
  slug: "accessibility",
  path: "/accessibility",
  title: "Accessibility",
  shortTitle: "Accessibility",
  updated: company.policiesUpdated.accessibility,
  description:
    "How the Air Quality Masters site is built to be used without a mouse, without sight or without motion — what meets WCAG 2.1 AA, and what is still imperfect.",
  lede:
    "What we have built into this site so it can be used without a mouse, without sight, or without motion — and what we know is still imperfect.",

  sections: [
    {
      id: "commitment",
      heading: "Our aim",
      body: [
        "We want anyone to be able to book HVAC service here, whatever they use to browse. The target is the Web Content Accessibility Guidelines (WCAG) 2.1 at level AA.",
        "We have not commissioned a formal third-party audit, so we are not going to claim conformance. What follows is an honest account of what has been done and what has not.",
      ],
    },

    {
      id: "built",
      heading: "What the site does",
      body: [
        {
          list: [
            "Every page is reachable and every control operable using only a keyboard, including the navigation menus and the interactive system diagram.",
            "A “skip to content” link is the first thing a keyboard or screen reader user reaches on every page.",
            "Focus is always visible. We have not removed focus outlines anywhere.",
            "Pages use real headings, landmarks and lists, so a screen reader can navigate by structure rather than reading top to bottom.",
            "Form fields have permanently visible labels, not placeholder text pretending to be labels. Errors are announced, tied to the field they belong to, and written in plain language.",
            "Images that carry meaning have text alternatives. Decorative graphics are hidden from assistive technology rather than read aloud as noise.",
            "Text contrast meets the AA threshold against its background throughout.",
            "The site works at 200% zoom and reflows to narrow screens without horizontal scrolling.",
            "Every animation, including the airflow field on the home page, stops when your system is set to reduce motion. The scroll-driven sections fall back to plain stacked content.",
            "Nothing is conveyed by colour alone.",
          ],
        },
      ],
    },

    {
      id: "limits",
      heading: "Known limitations",
      body: [
        {
          list: [
            "The site requires JavaScript. Without it you get a static page with our phone number and address rather than the full site.",
            "The interactive system diagram is a visual explanation. Its content is available as text through the hotspot buttons, but the drawing itself is not described in full.",
            "We have tested with keyboard navigation, browser zoom, reduced-motion settings and automated checks. We have not yet run a full manual screen reader audit across every page.",
          ],
        },
      ],
    },

    {
      id: "help",
      heading: "If something does not work",
      body: [
        "Tell us and we will fix it, and in the meantime we will do the thing you were trying to do for you. If the form is unusable for you, call and we will take the whole request over the phone — that route is always open and is not a lesser one.",
        ...CONTACT_BLOCK,
        "We aim to respond within two business days.",
      ],
    },
  ],
};

export const legalDocuments = [privacyPolicy, termsOfService, accessibilityStatement];

/** Formats an ISO date for display, e.g. "2 July 2025". */
export function formatUpdated(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
