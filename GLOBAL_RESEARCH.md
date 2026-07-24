# Global Research — rtrw.cetak.co.id (SILAS)

Status: **shared family evidence foundation complete; project gates remain explicit**

Last verified: **2026-07-25 (Asia/Jakarta)**

Research family: **F03 digital civic-service split — SILAS / RT-RW administration**

Catalog covered: **16 topic families / 96 planned articles** in [`ARTICLE_CATALOG.md`](ARTICLE_CATALOG.md)

Authority boundary: [`TOPICAL_AUTHORITY.md`](TOPICAL_AUTHORITY.md)

## Purpose

This is the reusable pre-writing evidence layer for the complete `rtrw.cetak.co.id` catalog. It combines the verified software-service evidence base with current Indonesian public-service, population-administration, privacy, electronic-system, archival, SPBE-security, and procurement sources.

It is not an article, a substitute for licensed standards, an engineering calculation, or permission to publish definitive safety, legal, performance, price, or compliance claims. Article writers must cite the original sources, not this file.

## How writers must use this file

1. Start with the coverage row for the relevant topic family.
2. Open the original source before using a technical, legal, safety, product, or performance claim.
3. Treat a catalog or abstract as proof of document identity, status, and visible scope only.
4. Distinguish material, processed product, and complete installed-system performance.
5. Distinguish Indonesian requirements from foreign reference methods.
6. Preserve every limitation, stop condition, recheck trigger, and professional-review gate.
7. Do not assume that evidence shared by a related project applies to a different application, configuration, product, or jurisdiction.
8. Recheck volatile sources when outlining begins or six months after the date above, whichever comes first.

## Evidence scale

| Grade | Meaning | Permitted use |
| --- | --- | --- |
| A | Current Indonesian law, official Indonesian standards catalog, or public primary-source document | Establish document status, jurisdiction, defined scope, and publicly visible facts |
| B | Current official ISO/standards-body abstract or official public test-method scope | Establish terminology and method scope; full text is required for exact requirements |
| C | Government technical guidance or recognized industry guidance | Explain concepts/practices with attribution and stated limits |
| D | Manufacturer technical guidance | Explain product-specific practice without generalizing beyond the documented system |
| Gate | Paid, project-specific, test-specific, or professional evidence is unresolved | Do not publish definitive selection, number, rating, compliance claim, or procedure |

## Reusable article-shape mapping

| Intent shape | Use of the research |
| --- | --- |
| Foundation/definitions | Terms, mechanisms, system boundaries, and commonly confused concepts |
| Selection/decision | Inputs, alternatives, trade-offs, consequences, and questions |
| Specification | Required data, units, source documents, assumptions, and approval gates |
| Design/interfaces | Support, movement, drainage, compatibility, access, and maintainability |
| Execution/QC | Sequencing, protection, hold points, records, and stop conditions |
| Diagnosis | Symptoms versus causes, safe observations, escalation, and missing evidence |
| Maintenance | Compatible methods, exposure logic, warning signs, and records |
| Procurement/handover | Comparable scope, submittals, tests, exclusions, warranties, and traceability |

## Research register

### KR-01 — Frozen scope and lifecycle model
- **Sources:** [`TOPICAL_AUTHORITY.md`](TOPICAL_AUTHORITY.md), and [`ARTICLE_CATALOG.md`](ARTICLE_CATALOG.md).
- **Grade:** P.
- **Purpose:** Freeze the verified editorial scope for `rtrw.cetak.co.id` and prevent family research from overriding this project's actual catalog boundaries.
- **Summary:** `rtrw.cetak.co.id` is a state-driven SILAS application and editorial plan for RT/RW service administration. Software-family evidence is reused, but legal authority, local procedure, resident-data access, and document validity remain project- and jurisdiction-specific.
- **Grounded facts:** There are 16 topic families and 96 planned articles. The repository demonstrates interface concepts and mock workflows; it does not prove production deployment, statutory authority, actual resident records, certified signatures, or an approved local procedure.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-01` (Dasar layanan dan peran RT/RW); `RTR-02` (Jenis surat pengantar dan persyaratan); `RTR-03` (Pengajuan dan pelacakan oleh warga); `RTR-04` (Verifikasi dan persetujuan pengurus); `RTR-05` (Onboarding dan identitas warga); `RTR-06` (Data kependudukan dan keluarga); `RTR-07` (Wilayah, blok, alamat, dan cakupan layanan); `RTR-08` (Organisasi dan tata kelola pengurus); `RTR-09` (Dokumen, tanda tangan, dan stempel digital); `RTR-10` (Privasi, keamanan, dan kontrol akses); `RTR-11` (Log aktivitas, transparansi, dan akuntabilitas); `RTR-12` (Laporan, ekspor, dan retensi arsip); `RTR-13` (Komunikasi, bantuan, dan pengaduan warga); `RTR-14` (Adopsi digital dan aksesibilitas layanan); `RTR-15` (Operasi, migrasi, dan keberlangsungan sistem); `RTR-16` (Implementasi, pengadaan, dan evaluasi SILAS). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** Local planning is not technical evidence; never reopen topic boundaries during research.

### KR-02 — Requirements, user evidence, and acceptance
- **Sources:** [UK Government Service Manual—agile delivery](https://www.gov.uk/service-manual/agile-delivery), [W3C WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- **Grade:** B-GOV / A-STD.
- **Purpose:** Ground discovery, user/task research, incremental delivery, and testable acceptance.
- **Summary:** Requirements should connect user problems and service outcomes to observable behavior and quality constraints; accessibility belongs in requirements rather than a final scan.
- **Grounded facts:** Assumptions, stakeholders, journeys, functional behavior, quality attributes, constraints, acceptance evidence, and traceability answer different questions.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-01` (Dasar layanan dan peran RT/RW); `RTR-02` (Jenis surat pengantar dan persyaratan); `RTR-03` (Pengajuan dan pelacakan oleh warga); `RTR-04` (Verifikasi dan persetujuan pengurus); `RTR-07` (Wilayah, blok, alamat, dan cakupan layanan); `RTR-08` (Organisasi dan tata kelola pengurus); `RTR-09` (Dokumen, tanda tangan, dan stempel digital); `RTR-11` (Log aktivitas, transparansi, dan akuntabilitas); `RTR-12` (Laporan, ekspor, dan retensi arsip); `RTR-13` (Komunikasi, bantuan, dan pengaduan warga); `RTR-14` (Adopsi digital dan aksesibilitas layanan); `RTR-15` (Operasi, migrasi, dan keberlangsungan sistem); `RTR-16` (Implementasi, pengadaan, dan evaluasi SILAS). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** A template does not validate demand or represent all users; require project research and decision ownership under GATE-01.

### KR-03 — Architecture decisions and web delivery
- **Sources:** [AWS Architecture Decision Records guidance](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html), [WHATWG HTML Living Standard](https://html.spec.whatwg.org/), [HTTP Semantics RFC 9110](https://www.rfc-editor.org/rfc/rfc9110).
- **Grade:** C-VEN / A-STD.
- **Purpose:** Support explicit architecture trade-offs and standards-based web behavior.
- **Summary:** An ADR records context, decision, alternatives, and consequences; web architecture must distinguish browser standards, HTTP semantics, rendering, state, content, identity, and operational constraints.
- **Grounded facts:** Static, server-rendered, client-rendered, CMS, custom, monolithic, modular, and serverless are options—not maturity ranks.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-13` (Komunikasi, bantuan, dan pengaduan warga); `RTR-15` (Operasi, migrasi, dan keberlangsungan sistem). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** AWS examples are vendor guidance, not a required method. No stack recommendation without GATE-01 and GATE-02.

### KR-04 — APIs, contracts, and authentication
- **Sources:** [OpenAPI Specification 3.1.1](https://spec.openapis.org/oas/v3.1.1.html), [OAuth 2.0 Security BCP—RFC 9700](https://www.rfc-editor.org/info/rfc9700/), [WebAuthn Level 3](https://www.w3.org/TR/webauthn-3/), [OWASP API Security Top 10 2023](https://owasp.org/API-Security/editions/2023/en/0x11-t10/).
- **Grade:** A-STD / B-IND.
- **Purpose:** Ground contract-first APIs, authorization flows, passkeys, and API abuse controls.
- **Summary:** API syntax, identity proof, authorization, token handling, object/function access, rate/resource control, versioning, and deprecation are separate design concerns.
- **Grounded facts:** RFC 9700 is a 2025 best-current-practice update for OAuth 2.0. OpenAPI describes an interface; it does not prove implementation behavior or security.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-01` (Dasar layanan dan peran RT/RW); `RTR-02` (Jenis surat pengantar dan persyaratan); `RTR-03` (Pengajuan dan pelacakan oleh warga); `RTR-04` (Verifikasi dan persetujuan pengurus); `RTR-05` (Onboarding dan identitas warga); `RTR-07` (Wilayah, blok, alamat, dan cakupan layanan); `RTR-08` (Organisasi dan tata kelola pengurus); `RTR-09` (Dokumen, tanda tangan, dan stempel digital); `RTR-10` (Privasi, keamanan, dan kontrol akses); `RTR-11` (Log aktivitas, transparansi, dan akuntabilitas); `RTR-12` (Laporan, ekspor, dan retensi arsip); `RTR-13` (Komunikasi, bantuan, dan pengaduan warga); `RTR-16` (Implementasi, pengadaan, dan evaluasi SILAS). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** Never publish secrets/private schemas or prescribe a flow without client/threat context. Apply GATE-03 and GATE-04.

### KR-05 — Data lifecycle, Indonesian privacy, and recovery
- **Sources:** [UU No. 27 Tahun 2022—BPK](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022), [PP No. 71 Tahun 2019—BPK](https://peraturan.bpk.go.id/Details/122030/pp-no-71-tahun-2019), [NIST Privacy Framework](https://www.nist.gov/privacy-framework).
- **Grade:** A-ID / B-GOV.
- **Purpose:** Ground personal-data mapping, electronic-system context, retention, rights, security, deletion, backup, and recovery.
- **Summary:** Data engineering must identify meaning, owner, purpose, access, lineage, quality, retention, backup/restore, deletion, processors/vendors, and incident paths.
- **Grounded facts:** Indonesia's PDP Law is the primary national personal-data statute; PP 71/2019 governs electronic systems and transactions at a broader level. A backup exists only as evidence when restoration is tested.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-01` (Dasar layanan dan peran RT/RW); `RTR-02` (Jenis surat pengantar dan persyaratan); `RTR-03` (Pengajuan dan pelacakan oleh warga); `RTR-04` (Verifikasi dan persetujuan pengurus); `RTR-05` (Onboarding dan identitas warga); `RTR-06` (Data kependudukan dan keluarga); `RTR-07` (Wilayah, blok, alamat, dan cakupan layanan); `RTR-08` (Organisasi dan tata kelola pengurus); `RTR-09` (Dokumen, tanda tangan, dan stempel digital); `RTR-10` (Privasi, keamanan, dan kontrol akses); `RTR-11` (Log aktivitas, transparansi, dan akuntabilitas); `RTR-12` (Laporan, ekspor, dan retensi arsip); `RTR-13` (Komunikasi, bantuan, dan pengaduan warga); `RTR-15` (Operasi, migrasi, dan keberlangsungan sistem). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** Do not infer lawful basis, role, transfer permission, retention period, notification duty, or sector rule without GATE-05.

### KR-06 — Secure software development and application assurance
- **Sources:** [NIST SP 800-218 SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final), [NIST SSDF publications and revision status](https://csrc.nist.gov/Projects/ssdf/publications), [OWASP ASVS project](https://owasp.org/www-project-application-security-verification-standard/).
- **Grade:** B-GOV / B-IND.
- **Purpose:** Establish lifecycle security, verification requirements, vulnerability handling, and evidence limits.
- **Summary:** Security is integrated into people/process, software protection, secure production, and vulnerability response; ASVS can structure application requirements and verification.
- **Grounded facts:** SSDF 1.1 remains final while revision 1.2 is draft as verified. A scan or ASVS checklist is not a penetration certificate or proof of complete security.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-01` (Dasar layanan dan peran RT/RW); `RTR-02` (Jenis surat pengantar dan persyaratan); `RTR-03` (Pengajuan dan pelacakan oleh warga); `RTR-04` (Verifikasi dan persetujuan pengurus); `RTR-05` (Onboarding dan identitas warga); `RTR-08` (Organisasi dan tata kelola pengurus); `RTR-09` (Dokumen, tanda tangan, dan stempel digital); `RTR-10` (Privasi, keamanan, dan kontrol akses); `RTR-11` (Log aktivitas, transparansi, dan akuntabilitas); `RTR-12` (Laporan, ekspor, dan retensi arsip); `RTR-13` (Komunikasi, bantuan, dan pengaduan warga); `RTR-16` (Implementasi, pengadaan, dan evaluasi SILAS). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** Version-pin ASVS/SSDF and obtain qualified testing for consequential systems under GATE-03.

### KR-07 — Dependencies, integrations, and software supply chain
- **Sources:** [CISA SBOM resources](https://www.cisa.gov/sbom), [NIST SP 800-161 Rev.1](https://csrc.nist.gov/pubs/sp/800/161/r1/final), [OpenSSF Scorecard](https://securityscorecards.dev/).
- **Grade:** B-GOV / B-IND.
- **Purpose:** Ground dependency inventory, vendor evaluation, provenance, and integration failure planning.
- **Summary:** Third-party code and services create lifecycle risk across identity, availability, data, licensing, change, compromise, and exit.
- **Grounded facts:** An SBOM improves component transparency but does not establish safety. A repository score is a signal, not due diligence.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-06` (Data kependudukan dan keluarga); `RTR-14` (Adopsi digital dan aksesibilitas layanan); `RTR-16` (Implementasi, pengadaan, dan evaluasi SILAS). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** Current vendor terms, APIs, quotas, subprocessors, and vulnerabilities require GATE-04 and GATE-09.

### KR-08 — Testing strategy and release evidence
- **Sources:** [NIST SP 800-218 SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final), [W3C WCAG-EM 1.0](https://www.w3.org/TR/WCAG-EM/), [OpenAPI Specification 3.1.1](https://spec.openapis.org/oas/v3.1.1.html).
- **Grade:** B-GOV / A-STD.
- **Purpose:** Separate test levels, specialist checks, acceptance, and release decisions.
- **Summary:** Unit, integration, contract, end-to-end, exploratory, accessibility, security, performance, resilience, and user acceptance tests cover different risks.
- **Grounded facts:** Passing automated tests proves only the sampled assertions, environment, build, and data. Traceability connects risks and requirements to results and unresolved defects.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-01` (Dasar layanan dan peran RT/RW); `RTR-02` (Jenis surat pengantar dan persyaratan); `RTR-03` (Pengajuan dan pelacakan oleh warga); `RTR-04` (Verifikasi dan persetujuan pengurus); `RTR-05` (Onboarding dan identitas warga); `RTR-09` (Dokumen, tanda tangan, dan stempel digital); `RTR-10` (Privasi, keamanan, dan kontrol akses); `RTR-11` (Log aktivitas, transparansi, dan akuntabilitas); `RTR-14` (Adopsi digital dan aksesibilitas layanan). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** No universal test pyramid or coverage threshold; use GATE-06.

### KR-09 — Cloudflare deployment and delivery controls
- **Sources:** [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/), [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/), [Cloudflare deployments documentation](https://developers.cloudflare.com/workers/configuration/versions-and-deployments/).
- **Grade:** C-VEN.
- **Purpose:** Ground Pages/Workers selection, environments, configuration, deployments, and rollback.
- **Summary:** Pages and Workers overlap but have different workflows and capabilities; production safety depends on versioned code/configuration, secret handling, migrations, preview/staging separation, cache/DNS behavior, and rollback evidence.
- **Grounded facts:** Provider docs establish current product behavior only for the cited platform/date. A successful upload is not an end-to-end release.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-07` (Wilayah, blok, alamat, dan cakupan layanan). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** Recheck limits, pricing, APIs, runtime compatibility, regional/data implications, and actual account configuration under GATE-07.

### KR-10 — Observability, SLOs, incidents, capacity, and cost
- **Sources:** [Google SRE Workbook—SLOs](https://sre.google/workbook/implementing-slos/), [OpenTelemetry documentation](https://opentelemetry.io/docs/), [NIST incident response SP 800-61 Rev.3](https://csrc.nist.gov/pubs/sp/800/61/r3/final).
- **Grade:** B-IND / B-GOV.
- **Purpose:** Ground service health definitions, telemetry, alerting, response, learning, and capacity/cost controls.
- **Summary:** Useful telemetry follows user/service risks; SLOs, logs, metrics, traces, alerts, runbooks, incident roles, post-incident actions, quotas, and cost attribution are distinct artifacts.
- **Grounded facts:** Instrumentation creates signals, not reliability. An SLO is a service objective and decision mechanism, not a contractual uptime promise.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-01` (Dasar layanan dan peran RT/RW); `RTR-02` (Jenis surat pengantar dan persyaratan); `RTR-03` (Pengajuan dan pelacakan oleh warga); `RTR-04` (Verifikasi dan persetujuan pengurus); `RTR-07` (Wilayah, blok, alamat, dan cakupan layanan); `RTR-08` (Organisasi dan tata kelola pengurus); `RTR-09` (Dokumen, tanda tangan, dan stempel digital); `RTR-11` (Log aktivitas, transparansi, dan akuntabilitas); `RTR-14` (Adopsi digital dan aksesibilitas layanan). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** No 24/7 or uptime claim without actual operating evidence/contract. Apply GATE-07 and GATE-08.

### KR-11 — Accessibility conformance and inclusive testing
- **Sources:** [WCAG 2.2 Recommendation](https://www.w3.org/TR/WCAG22/), [WCAG-EM 1.0](https://www.w3.org/TR/WCAG-EM/), [WAI Easy Checks](https://www.w3.org/WAI/test-evaluate/preliminary/).
- **Grade:** A-STD.
- **Purpose:** Ground accessible design, implementation, evaluation, procurement, and maintenance.
- **Summary:** WCAG 2.2 addresses perceivable, operable, understandable, and robust content with conformance requirements; representative evaluation combines automated and manual inspection.
- **Grounded facts:** Full-page and process scope matter. Keyboard/focus, semantics, forms/errors, reflow/zoom, authentication, media, and assistive-technology behavior cannot be certified by one scanner.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-12` (Laporan, ekspor, dan retensi arsip); `RTR-14` (Adopsi digital dan aksesibilitas layanan); `RTR-16` (Implementasi, pengadaan, dan evaluasi SILAS). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** WCAG conformance is not automatically Indonesian legal compliance. Apply GATE-05 and GATE-06.

### KR-12 — Web performance and reliability measurement
- **Sources:** [web.dev Core Web Vitals](https://web.dev/articles/vitals), [Chrome UX Report documentation](https://developer.chrome.com/docs/crux), [HTTP caching RFC 9111](https://www.rfc-editor.org/rfc/rfc9111).
- **Grade:** C-VEN / A-STD.
- **Purpose:** Ground lab/field measurement, budgets, caching, regression, and causal claims.
- **Summary:** User performance varies by device, network, geography, content, cache, workload, percentile, and measurement method; field and lab data answer different questions.
- **Grounded facts:** Core Web Vitals are provider-defined evolving metrics. A before/after claim needs stable scope, sample, conditions, version, and caveats.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-06` (Data kependudukan dan keluarga). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** No ranking, load-time, energy, or conversion guarantee. Recheck thresholds/tools and apply GATE-08.

### KR-13 — Maintenance, modernization, migration, and retirement
- **Sources:** [NIST SSDF publications](https://csrc.nist.gov/Projects/ssdf/publications), [CISA Known Exploited Vulnerabilities Catalog](https://www.cisa.gov/known-exploited-vulnerabilities-catalog), [Google Search site-move guidance](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).
- **Grade:** B-GOV / C-VEN.
- **Purpose:** Ground dependency/runtime maintenance, vulnerability prioritization, migration, recovery, and decommissioning.
- **Summary:** Refactor, upgrade, replatform, strangler migration, rewrite, archive, and deletion have different risk/exit profiles.
- **Grounded facts:** Vulnerability severity is not the sole prioritization input; exposure, exploitation, business impact, fix safety, rollback, and ownership matter. URL/data migrations need inventories and reconciliation.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-06` (Data kependudukan dan keluarga); `RTR-12` (Laporan, ekspor, dan retensi arsip); `RTR-15` (Operasi, migrasi, dan keberlangsungan sistem). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** Never prescribe replacement from age alone or delete history/data without GATE-02, GATE-05, and GATE-08.

### KR-14 — AI and automation risk boundaries
- **Sources:** [NIST AI RMF 1.0](https://www.nist.gov/itl/ai-risk-management-framework), [NIST AI 600-1 Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), [NIST SP 800-218A](https://csrc.nist.gov/pubs/sp/800/218/a/final).
- **Grade:** B-GOV.
- **Purpose:** Ground AI use-case selection, data rights, evaluation, human control, monitoring, fallback, and retirement.
- **Summary:** AI risk management is sociotechnical and lifecycle-wide; rules, predictive ML, generative models, retrieval, agents, and human workflows require different evaluation and control.
- **Grounded facts:** Fluent output is not correctness. Evaluation sets must represent the intended task and failure/abuse cases; human review needs real authority, information, and fallback.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-06` (Data kependudukan dan keluarga); `RTR-07` (Wilayah, blok, alamat, dan cakupan layanan); `RTR-15` (Operasi, migrasi, dan keberlangsungan sistem). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** Never invent accuracy, autonomy, privacy, copyright permission, or provider retention behavior. Apply GATE-05 and GATE-10.

### KR-15 — Procurement, governance, handover, and vendor exit
- **Sources:** [NIST SP 800-161 Rev.1](https://csrc.nist.gov/pubs/sp/800/161/r1/final), [CISA Secure by Design](https://www.cisa.gov/securebydesign), [UK Technology Code of Practice](https://www.gov.uk/guidance/the-technology-code-of-practice).
- **Grade:** B-GOV.
- **Purpose:** Ground comparable procurement, risk allocation, delivery roles, evidence handover, and operational independence.
- **Summary:** Buyers need requirements, assumptions, exclusions, milestones, change control, ownership, accounts, source, data, security, accessibility, tests, acceptance, warranty/support, cost, lock-in, transition, and exit.
- **Grounded facts:** Lowest build price is not total lifecycle cost. A portfolio or certification logo does not prove the proposed team's scope or outcomes.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-05` (Onboarding dan identitas warga); `RTR-08` (Organisasi dan tata kelola pengurus); `RTR-10` (Privasi, keamanan, dan kontrol akses); `RTR-13` (Komunikasi, bantuan, dan pengaduan warga); `RTR-14` (Adopsi digital dan aksesibilitas layanan); `RTR-15` (Operasi, migrasi, dan keberlangsungan sistem); `RTR-16` (Implementasi, pengadaan, dan evaluasi SILAS). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** No legal interpretation, market price, vendor endorsement, or capability claim without GATE-09 and qualified contract review.

### KR-16 — Content systems, crawl/indexing, and claim quality
- **Sources:** [Google Search Essentials](https://developers.google.com/search/docs/essentials), [Google people-first content guidance](https://developers.google.com/search/docs/fundamentals/creating-helpful-content), [Schema.org documentation](https://schema.org/docs/documents.html).
- **Grade:** C-VEN / B-IND.
- **Purpose:** Ground content models, crawl/index controls, structured data, migrations, and evidence-led SEO.
- **Summary:** Content quality, crawlability, indexability, canonicalization, structured data eligibility, ranking, qualified leads, and revenue are separate outcomes.
- **Grounded facts:** Sitemaps and structured data aid discovery/interpretation but do not guarantee indexing, rich results, ranking, traffic, or revenue.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-06` (Data kependudukan dan keluarga). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** Search systems and policies change. No city swaps, link schemes, approval, ranking, or income promises; apply GATE-08.

### KR-17 — Capability proof and case-study evidence
- **Sources:** [UK Government Service Standard](https://www.gov.uk/service-manual/service-standard), [NIST SSDF 1.1](https://csrc.nist.gov/pubs/sp/800/218/final), [W3C WCAG-EM](https://www.w3.org/TR/WCAG-EM/).
- **Grade:** B-GOV / A-STD.
- **Purpose:** Establish an evidence hierarchy for provider selection, portfolios, cases, and measured outcomes.
- **Summary:** Credible proof identifies legal/team identity, role, dates, scope, methods, artifacts, consent, baselines, verification, outcomes, caveats, failures, and current status.
- **Grounded facts:** A screenshot, domain, logo, testimonial, tool badge, or live page alone does not prove authorship, scope, conformance, security, or business impact.
- **Incorporation:** For `rtrw.cetak.co.id`, use this record in `RTR-05` (Onboarding dan identitas warga); `RTR-10` (Privasi, keamanan, dan kontrol akses). Let those local topic decisions determine which parts of the record enter each outline; cite the original sources, retain jurisdiction/product/system limits, and resolve the mapped evidence gates before definitive numeric or compliance claims.
- **Limits/recheck:** Do not invent clients, results, certifications, team competence, or consent. Apply GATE-09.

### KR-18 — Public-service duties and the RT/RW authority boundary
- **Sources:** [UU No. 25 Tahun 2009 tentang Pelayanan Publik — BPK](https://peraturan.bpk.go.id/Details/38748/uu).
- **Grade:** A-ID.
- **Purpose:** Ground service-quality concepts while preventing a neighborhood application from inventing governmental authority.
- **Summary:** UU 25/2009 frames public-service rights, duties, standards, complaints, and accountability for covered providers. Whether a particular RT/RW body, letter type, officer, or SILAS deployment falls within a provision depends on the current local legal and organizational basis.
- **Grounded facts:** A digital workflow should identify the responsible organization, service owner, eligible requester, required inputs, decision authority, service standard, complaint route, and offline alternative. A screen label or stamp image does not create legal authority.
- **Incorporation:** Use in `RTR-01`, `RTR-02`, `RTR-03`, `RTR-04`, `RTR-08`, `RTR-13`, and `RTR-16` to distinguish resident guidance, officer workflow, local governance, and accountable service design.
- **Limits/recheck:** Do not describe RT/RW as a universal government office or publish definitive duties, fees, time limits, letter powers, appointment rules, or complaint outcomes without the current province/regency/city/village rules and competent local review.

### KR-19 — Population administration, resident identity, and source-of-truth limits
- **Sources:** [UU No. 23 Tahun 2006 tentang Administrasi Kependudukan — BPK](https://peraturan.bpk.go.id/Details/40202/uu-no-23-2006), [UU No. 24 Tahun 2013 amendment — BPK](https://peraturan.bpk.go.id/Details/38985/uu-no-24-tahun-2013), [PP No. 40 Tahun 2019 — BPK](https://peraturan.bpk.go.id/Details/108801/pp-no-40-tahun-).
- **Grade:** A-ID.
- **Purpose:** Separate local service-support records from authoritative population-registration systems and documents.
- **Summary:** Indonesia's population-administration framework assigns roles to named government organizers and implementing agencies and regulates population data, registration, civil registration, documents, systems, access, and protection. SILAS must not imply that its mock data or neighborhood register replaces an authorized population record.
- **Grounded facts:** NIK, KK relationships, address, population events, civil-status events, corrections, access rights, and document issuance are not interchangeable. Data copied into a neighborhood workflow needs a defined source, purpose, verification state, update path, access basis, and correction/reconciliation process.
- **Incorporation:** Use in `RTR-02`, `RTR-04`, `RTR-05`, `RTR-06`, `RTR-07`, `RTR-09`, and `RTR-12`; label locally maintained fields and status explicitly and route official changes to the competent authority.
- **Limits/recheck:** Do not define universal letter prerequisites, validate a NIK, claim access to SIAK, issue a population document, or prescribe correction procedures without current official and local implementation rules.

### KR-20 — Personal-data lifecycle and resident rights
- **Sources:** [UU No. 27 Tahun 2022 tentang Pelindungan Data Pribadi — BPK](https://peraturan.bpk.go.id/Details/229798/uu-no-27-tahun-2022.12UUD).
- **Grade:** A-ID.
- **Purpose:** Ground privacy-by-design for NIK, identity documents, family relationships, addresses, contact details, signatures, complaints, logs, and exports.
- **Summary:** The PDP Law covers personal-data categories, data-subject rights, processing, controller/processor obligations, transfers, sanctions, disputes, prohibitions, and criminal provisions. The current BPK record also notes a Constitutional Court interpretation affecting part of Article 53.
- **Grounded facts:** Inventory, purpose, lawful basis, minimization, accuracy, access, disclosure, retention, deletion, processor/vendor roles, security, incident handling, and rights response are separate decisions. A consent checkbox is not a universal basis or complete privacy program.
- **Incorporation:** Use in `RTR-03`, `RTR-05`, `RTR-06`, `RTR-07`, `RTR-10`, `RTR-11`, `RTR-12`, `RTR-13`, `RTR-15`, and `RTR-16`; map each field/export/log to purpose, owner, access, lifecycle, and incident path.
- **Limits/recheck:** Do not declare compliance, select a lawful basis, set a retention period, approve a transfer, or state a notification duty without the actual operator, data map, current implementing rules, contracts, and qualified Indonesian review.

### KR-21 — Electronic information, signatures, seals, and document evidence
- **Sources:** [UU No. 1 Tahun 2024, second amendment to the ITE Law — BPK](https://peraturan.bpk.go.id/Details/274494/uu-no-1-tahun-2024), [PP No. 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik — BPK](https://peraturan.bpk.go.id/Details/122030/pp-no-71-tahun-2019?nonamp=1&source=).
- **Grade:** A-ID.
- **Purpose:** Prevent interface simulations of signatures and stamps from being described as legally valid electronic signatures or authentic official documents.
- **Summary:** The ITE framework and PP 71/2019 govern electronic information, documents, systems, transactions, and related trust concepts. Legal effect depends on the applicable current text and the actual process, signer authority, system, evidence, and sector/local rules—not on an image placed over a PDF.
- **Grounded facts:** Template approval, document number, signer identity, signing authority, signature mechanism, certificate/provider where applicable, timestamp, integrity, verification, issuance, revocation/correction, access, and audit evidence are distinct controls.
- **Incorporation:** Use in `RTR-04`, `RTR-09`, `RTR-10`, `RTR-11`, `RTR-12`, and `RTR-15`; clearly distinguish mock UI, scanned signature, electronic signature, digital certificate, visual stamp, and verified issued record.
- **Limits/recheck:** Do not claim authenticity, non-repudiation, legal validity, certified signature status, or admissibility without current consolidated law, the exact technical implementation, signer mandate, certificate evidence, and competent review.

### KR-22 — Archives, retention, disposition, and export control
- **Sources:** [UU No. 43 Tahun 2009 tentang Kearsipan — BPK](https://peraturan.bpk.go.id/Details/38788/uu-no43-tahun-2009), [PP No. 28 Tahun 2012 implementing the Archives Law — BPK](https://peraturan.bpk.go.id/Details/5240/pp-no-).
- **Grade:** A-ID.
- **Purpose:** Ground record lifecycle, authenticity, availability, retention, transfer, and controlled disposal.
- **Summary:** Indonesia's archival framework governs records and implementation of archival responsibilities. An application export is only one representation; retention and disposition depend on record identity, responsible organization, classification, schedule, legal holds, provenance, integrity, access, and authorized action.
- **Grounded facts:** Operational database rows, issued documents, drafts, attachments, logs, reports, backups, and exported CSV/PDF files can have different owners and lifecycles. Deletion from the live interface does not prove deletion from logs, backups, devices, or third parties.
- **Incorporation:** Use in `RTR-09`, `RTR-11`, `RTR-12`, `RTR-15`, and `RTR-16`; require record inventories, version/provenance fields, export controls, retention authority, restore tests, and disposition evidence.
- **Limits/recheck:** Do not publish a universal retention schedule or disposal method. Resolve the operator's status, current ANRI/local rules, record class, schedule approval, legal holds, and data-protection obligations.

### KR-23 — SPBE governance and security are applicability-gated
- **Sources:** [Perpres No. 95 Tahun 2018 tentang SPBE — BPK](https://peraturan.bpk.go.id/Details/96913/perpres-no-95-tahun-2018), [Peraturan BSSN No. 4 Tahun 2021 — BPK](https://peraturan.bpk.go.id/Details/174275/peraturan-bssn-no-4-).
- **Grade:** A-ID.
- **Purpose:** Provide current Indonesian public-sector digital-governance and security references without assuming every RT/RW deployment is formally an SPBE system.
- **Summary:** Perpres 95/2018 establishes national SPBE governance and management context; BSSN 4/2021 provides SPBE information-security management guidance and technical/security procedures. Applicability depends on the actual operating institution and system classification.
- **Grounded facts:** Governance, architecture, services, data, applications, infrastructure, security, audit, risk, continuity, and responsible roles are connected but separate evidence layers. A private demo or community tool does not inherit government approval by referencing SPBE.
- **Incorporation:** Use in `RTR-08`, `RTR-10`, `RTR-11`, `RTR-14`, `RTR-15`, and `RTR-16`; translate applicable controls into named owners, risk records, tests, incident paths, continuity exercises, and review evidence.
- **Limits/recheck:** Do not claim SPBE compliance, certification, government endorsement, security level, or mandatory scope without operator classification, current rules, implementation evidence, and BSSN/local competent review.

### KR-24 — Current procurement, implementation, acceptance, and vendor exit
- **Sources:** [Perpres No. 16 Tahun 2018 procurement record and amendment status — BPK](https://peraturan.bpk.go.id/Details/73586/perpres-no-), [Perpres No. 46 Tahun 2025 second amendment — BPK](https://peraturan.bpk.go.id/Details/318647/perpres-no-46-tahun-2025), [Peraturan LKPP No. 12 Tahun 2021 — BPK](https://peraturan.bpk.go.id/Details/169565/per).
- **Grade:** A-ID for covered public procurement; Gate for a private/community purchase.
- **Purpose:** Ground comparable acquisition and lifecycle handover using the current amendment chain.
- **Summary:** The BPK record shows Perpres 16/2018 was amended in 2021 and again by Perpres 46/2025. The LKPP provider guideline covers preparation, provider selection, contract performance, handover, and performance assessment under its scope.
- **Grounded facts:** A SILAS procurement should separate needs, users, data authority, requirements, hosting, accounts/source ownership, security/privacy/accessibility, migration, testing, acceptance, training, support, change, cost, continuity, handover, and exit. Public-procurement rules do not automatically govern a privately funded neighborhood purchase.
- **Incorporation:** Use in `RTR-15` and `RTR-16`, with `RTR-01`, `RTR-08`, `RTR-10`, and `RTR-12` as requirement inputs.
- **Limits/recheck:** Do not prescribe a method, threshold, evaluation formula, contract clause, or vendor eligibility without the current consolidated rules, funding/operator status, procurement officer, and legal review.

## Topic-family coverage matrix

| Topic family | Main evidence records | Safe ground for the article set | Remaining gate before definitive drafting |
| --- | --- | --- | --- |
| `RTR-01` | KR-01, KR-02, KR-18, KR-23 | Dasar layanan dan peran RT/RW: identify users, service owner, role boundaries, accountable decisions, and offline alternatives without inventing authority. | GATE-01, GATE-11 |
| `RTR-02` | KR-01, KR-18, KR-19, KR-20 | Jenis surat dan persyaratan: explain evidence collection and service routing while distinguishing local support letters from official population documents. | GATE-11, GATE-12, GATE-13 |
| `RTR-03` | KR-02, KR-08, KR-18, KR-20 | Resident submission/tracking: define states, correction loops, notifications, privacy, accessibility, and acceptance evidence. | GATE-01, GATE-05, GATE-06, GATE-12 |
| `RTR-04` | KR-08, KR-18, KR-19, KR-21 | Officer verification/approval: separate identity evidence, decision authority, document control, rejection reasons, and audit trail. | GATE-11, GATE-12, GATE-14 |
| `RTR-05` | KR-04, KR-05, KR-19, KR-20 | Onboarding and identity: minimize data, distinguish authentication from civil identity, and preserve correction/access paths. | GATE-03, GATE-04, GATE-05, GATE-13 |
| `RTR-06` | KR-05, KR-19, KR-20, KR-22 | Population/household records: define provenance, local status, reconciliation, access, accuracy, lifecycle, and source-of-truth boundary. | GATE-05, GATE-13, GATE-15 |
| `RTR-07` | KR-02, KR-19, KR-20 | Territory/address/service scope: document local definitions, routing rules, changes, evidence, and privacy implications. | GATE-01, GATE-11, GATE-13 |
| `RTR-08` | KR-02, KR-18, KR-23 | Officer organization/governance: identify mandates, appointment/delegation evidence, responsibilities, access roles, handover, and oversight. | GATE-01, GATE-11 |
| `RTR-09` | KR-08, KR-19, KR-21, KR-22 | Documents/signatures/stamps: control templates, numbers, authority, integrity, verification, correction, issuance, and archive linkage. | GATE-12, GATE-14, GATE-15 |
| `RTR-10` | KR-04–KR-07, KR-20, KR-23 | Privacy/security/access: connect data inventory and threats to least privilege, verification, logging, incident handling, vendors, and resident rights. | GATE-03, GATE-04, GATE-05, GATE-13 |
| `RTR-11` | KR-06, KR-08, KR-10, KR-20, KR-22, KR-23 | Activity logs/accountability: define events, actor/time/object/change/result, access, integrity, review, retention, correction, and incident use. | GATE-03, GATE-05, GATE-06, GATE-15 |
| `RTR-12` | KR-05, KR-20, KR-22 | Reports/exports/retention: control purpose, fields, authorization, version, delivery, downstream copies, schedule, restore, and disposition. | GATE-05, GATE-13, GATE-15 |
| `RTR-13` | KR-02, KR-18, KR-20 | Communication/help/complaints: publish accountable contact and escalation paths without exposing resident data or promising unsupported outcomes. | GATE-01, GATE-05, GATE-11 |
| `RTR-14` | KR-02, KR-08, KR-11, KR-18 | Adoption/accessibility: test complete resident and officer processes across devices, abilities, literacy, assisted service, and offline fallback. | GATE-01, GATE-06, GATE-12 |
| `RTR-15` | KR-05, KR-10, KR-13, KR-22, KR-23 | Operations/migration/continuity: inventory data/dependencies, test backup and restore, stage migration, preserve reconciliation, and exercise fallback. | GATE-02, GATE-03, GATE-05, GATE-07, GATE-15 |
| `RTR-16` | KR-02, KR-07, KR-15, KR-17, KR-23, KR-24 | Implementation/procurement/evaluation: define outcomes, roles, requirements, evidence, total lifecycle cost, acceptance, handover, support, and exit. | GATE-01, GATE-06, GATE-09, GATE-16 |

Coverage result: **16/16 topic families mapped; 0 families without a starting evidence set.**

## Cross-catalog fact bank

1. A definition, method, regulation, product claim, and complete-system result are different evidence layers.
2. A source supports only its stated jurisdiction, edition, product, specimen, configuration, conditions, and public scope.
3. Standards abstracts identify documents and visible scope; exact requirements require the current full text.
4. Foreign standards and industry guidance do not automatically become Indonesian legal requirements.
5. Procurement and handover claims require current project, supplier, contract, test, warranty, and traceability evidence.

## Evidence gaps and publication gates

| Gate | Affected topic families | Resolution required |
| --- | --- | --- |
| `GATE-01` Named users/stakeholders, current process, constraints, baseline, and acceptance owner are evidenced. | `RTR-01`, `RTR-02`, `RTR-03`, `RTR-04`, `RTR-05`, `RTR-06`, `RTR-07`, `RTR-08`, `RTR-09`, `RTR-10`, `RTR-11`, `RTR-12`, `RTR-13`, `RTR-14`, `RTR-15`, `RTR-16` | Need, priority, MVP, usability, or fitness for purpose. |
| `GATE-02` Current system/data/dependency inventory, quality attributes, capacity/cost assumptions, and ADR review exist. | `RTR-01`, `RTR-02`, `RTR-03`, `RTR-04`, `RTR-05`, `RTR-06`, `RTR-07`, `RTR-08`, `RTR-09`, `RTR-10`, `RTR-11`, `RTR-12`, `RTR-13`, `RTR-14`, `RTR-15`, `RTR-16` | Architecture/stack suitability, rewrite/migration, scalability, or cost. |
| `GATE-03` Versioned threat model, control set, secure-development evidence, and qualified verification cover the exact release. | `RTR-01`, `RTR-02`, `RTR-03`, `RTR-04`, `RTR-05`, `RTR-06`, `RTR-07`, `RTR-08`, `RTR-09`, `RTR-10`, `RTR-11`, `RTR-12`, `RTR-13`, `RTR-14`, `RTR-15`, `RTR-16` | Secure, ASVS-aligned, vulnerability-free, or penetration-tested. |
| `GATE-04` Current provider/API/auth contract, scopes, quotas, data flow, failure behavior, tests, and exit are verified. | `RTR-01`, `RTR-02`, `RTR-03`, `RTR-04`, `RTR-05`, `RTR-06`, `RTR-07`, `RTR-08`, `RTR-09`, `RTR-10`, `RTR-11`, `RTR-12`, `RTR-13`, `RTR-14`, `RTR-15`, `RTR-16` | Integration compatibility, OAuth safety, API reliability, or vendor behavior. |
| `GATE-05` Current consolidated Indonesian law, sector/local rules, roles, data map, purposes/bases, rights, vendors/transfers, retention, incident and legal review exist. | `RTR-01`, `RTR-02`, `RTR-03`, `RTR-04`, `RTR-05`, `RTR-06`, `RTR-07`, `RTR-08`, `RTR-09`, `RTR-10`, `RTR-11`, `RTR-12`, `RTR-13`, `RTR-14`, `RTR-15`, `RTR-16` | PDP/legal compliance, consent need, transfer, retention, deletion, or notification duty. |
| `GATE-06` Defined release scope, environments, representative data/users, criteria, test results, defects/exceptions, and decision owner exist. | `RTR-01`, `RTR-02`, `RTR-03`, `RTR-04`, `RTR-05`, `RTR-06`, `RTR-07`, `RTR-08`, `RTR-09`, `RTR-10`, `RTR-11`, `RTR-12`, `RTR-13`, `RTR-14`, `RTR-15`, `RTR-16` | Quality, accessibility conformance, acceptance, or release readiness. |
| `GATE-07` Actual hosting/account/runtime configuration, current provider limits, deployment, migration, secrets, rollback, DNS/cache and smoke tests are recorded. | `RTR-10`, `RTR-15`, `RTR-16` | Production design, deployability, rollback, regional behavior, price, or quota. |
| `GATE-08` Dated lab/field/telemetry evidence states build, environment, sample, percentile, cache, tool/version, baseline, incident/cost window, and owner. | `RTR-01`, `RTR-02`, `RTR-03`, `RTR-04`, `RTR-05`, `RTR-06`, `RTR-07`, `RTR-08`, `RTR-09`, `RTR-10`, `RTR-11`, `RTR-12`, `RTR-13`, `RTR-14`, `RTR-15`, `RTR-16` | Speed, reliability, uptime, capacity, SEO, conversion, or operating-cost result. |
| `GATE-09` Contract/current offer and verified provider evidence cover entity/team, scope, ownership, consent, source/accounts, subcontractors, warranty/support, results, handover, and exit. | `RTR-01`, `RTR-02`, `RTR-03`, `RTR-04`, `RTR-05`, `RTR-06`, `RTR-07`, `RTR-08`, `RTR-09`, `RTR-10`, `RTR-11`, `RTR-12`, `RTR-13`, `RTR-14`, `RTR-15`, `RTR-16` | Price, competence, client relationship, certification, warranty, or case outcome. |
| `GATE-10` Any later AI/automation feature has an approved use case, data rights/provider handling, representative evaluation, failure/abuse results, human authority, monitoring, fallback, and disable path. | `RTR-16` | AI accuracy, autonomy, safety, privacy, copyright, savings, or official-decision claim. |
| `GATE-11` Current local legal/organizational instruments identify the RT/RW body, territorial scope, officer mandate, delegations, service owner, complaint route, and applicable public-service duties. | `RTR-01`, `RTR-02`, `RTR-04`, `RTR-07`, `RTR-08`, `RTR-13`, `RTR-16` | Authority, universal roles, eligible service, fee, deadline, approval power, or complaint outcome. |
| `GATE-12` The competent local service owner verifies each letter type, purpose, requester, prerequisites, evidence, decision states, signer, issue path, validity, correction, and downstream destination. | `RTR-02`, `RTR-03`, `RTR-04`, `RTR-09`, `RTR-14` | Required documents, eligibility, approval logic, processing time, letter validity, or accepted destination. |
| `GATE-13` Actual operator/controller roles, population-data authority, field-level data map, purpose/basis, accuracy source, access, resident rights, processors, transfers, retention and incident procedure are reviewed. | `RTR-02`, `RTR-05`, `RTR-06`, `RTR-07`, `RTR-10`, `RTR-12` | NIK/KK verification, SIAK linkage, privacy compliance, consent, access right, disclosure, retention, deletion, or breach duty. |
| `GATE-14` Exact document template/version, number authority, signer mandate, signature method, certificate/provider if any, integrity/timestamp/verification process, seal use, issuance and correction evidence are approved. | `RTR-04`, `RTR-09`, `RTR-11` | Official, authentic, certified, valid electronic signature, non-repudiation, admissibility, or tamper-proof claim. |
| `GATE-15` Responsible archive authority confirms record classes, provenance/integrity controls, access, approved retention schedule, legal holds, backup/restore scope, export copies and authorized disposition. | `RTR-06`, `RTR-09`, `RTR-11`, `RTR-12`, `RTR-15` | Archive compliance, retention period, authoritative copy, complete deletion, recovery, or lawful disposal. |
| `GATE-16` Funding/operator status and the current amendment chain are confirmed by the responsible procurement/legal roles; requirements, evaluation, contract, acceptance, ownership, support, handover and exit evidence cover the actual acquisition. | `RTR-16` | Mandatory procurement method, threshold, vendor qualification, price, award, contract duty, acceptance, or government compliance. |

## Source-refresh triggers

Recheck a record immediately when:

- an Indonesian law, regulation, or official standard status changes;
- a standards body publishes a new edition used by the article;
- a manufacturer changes product scope, instructions, compatibility, test evidence, or warranty;
- an article introduces a number, price, rating, classification, compliance statement, or safety procedure;
- the target project/application differs from the exemplar's jurisdiction, user, product, configuration, or operating environment.

## Next authorized stage

The later outline and constrained-writing-instruction stage may use this file only when separately authorized. Article drafting, Markdown article creation, HTML hydration, publication dating, sitemap generation, deployment, and Google Search Console submission are intentionally **not performed in this research stage**.
