# Topical Authority — rtrw.cetak.co.id

## Role and boundary

`rtrw.cetak.co.id` is a specialist Indonesian knowledge and product-support property for digitizing RT/RW administration through SILAS (Sistem Layanan Surat Pengantar). It should help residents, neighborhood officers, implementation teams, and local stakeholders understand service workflows, citizen records, organizational governance, reporting, and responsible system operation. The live application owns login, submissions, approvals, records, and exports; editorial pages explain decisions and procedures without collecting personal data or competing with runtime views. Because the subject touches NIK, official correspondence, signatures, stamps, privacy, and access control, every legal, records, identity, and security claim requires current official-source and competent-practitioner review before publication.

## Context used

- The repository is a single-route React/Vite SPA and contains no sitemap file or static editorial route family.
- The public login screen identifies SILAS as “Sistem Layanan Surat Pengantar” and promises one integrated workflow for resident requests, document verification, digital signatures, and official RT/RW stamps.
- Runtime state defines 4 role stages (`guest`, `onboarding`, `warga`, `pengurus`), 10 pengurus views, and 6 warga views.
- Representative navigation labels are Dashboard, Layanan Surat, Daftar Terbit, Data Kependudukan, Organisasi Pengurus, Ekspor Laporan, Log Aktivitas, Pengaturan Wilayah, Profil Pengurus, Beranda Warga, and Hubungi Pengurus RT/RW.
- Fifteen UI components represent the meaningful product families; these labels were used as entity and workflow evidence rather than reading repeated interface copy.

## Ignored template noise

- No sitemap, archive, pagination, author, tag, feed, or location-swapped route families exist in the tracked project.
- Framework configuration, styles, icons, mock records, package metadata, and repeated JSX implementation details were not treated as editorial coverage.
- The generic AI Studio README banner and deployment boilerplate were ignored as product-description evidence.
- Application views are state-driven screens under one public route, not 16 independently indexable editorial URLs.

## Topical map

| Topic ID | Parent topic | Reader outcome | Boundary | Article target |
|---|---|---|---|---:|
| RTR-01 | Dasar layanan dan peran RT/RW | Understand the administrative ecosystem, participants, responsibilities, and limits of a digital neighborhood service. | Owns system orientation and role boundaries; organizational setup belongs to RTR-08 and implementation planning to RTR-16. | 6 |
| RTR-02 | Jenis surat pengantar dan persyaratan | Identify common resident needs, document inputs, validity questions, and the appropriate request path. | Owns service-type and prerequisite education; submission steps belong to RTR-03 and approval decisions to RTR-04. | 6 |
| RTR-03 | Pengajuan dan pelacakan oleh warga | Submit, save, correct, monitor, and complete a request without confusing draft, pending, rejected, and issued states. | Owns the resident journey; officer verification belongs to RTR-04 and identity onboarding to RTR-05. | 6 |
| RTR-04 | Verifikasi dan persetujuan pengurus | Review evidence, request corrections, approve or reject consistently, and document the decision. | Owns officer decision workflow; document authenticity controls belong to RTR-09 and audit oversight to RTR-11. | 6 |
| RTR-05 | Onboarding dan identitas warga | Register residents responsibly, validate identity inputs, and handle profile changes without unnecessary data exposure. | Owns individual account and identity intake; household registry structure belongs to RTR-06 and access security to RTR-10. | 6 |
| RTR-06 | Data kependudukan dan keluarga | Maintain accurate resident, household, relationship, and address records across routine changes. | Owns population and KK data quality; territorial coding belongs to RTR-07 and exports to RTR-12. | 6 |
| RTR-07 | Wilayah, blok, alamat, dan cakupan layanan | Define service boundaries, address structures, maps, and relocation workflows that route residents correctly. | Owns geographic service configuration; officer hierarchy belongs to RTR-08 and personal profile data to RTR-05/RTR-06. | 6 |
| RTR-08 | Organisasi dan tata kelola pengurus | Model RT/RW roles, appointments, delegations, handovers, and service accountability. | Owns governance and officer lifecycle; operational permissions belong to RTR-10 and resident contact workflows to RTR-13. | 6 |
| RTR-09 | Dokumen, tanda tangan, dan stempel digital | Preserve controlled templates, document numbering, authorization evidence, issuance, and verification. | Owns official-document lifecycle concepts; service eligibility belongs to RTR-02 and approval reasoning to RTR-04. | 6 |
| RTR-10 | Privasi, keamanan, dan kontrol akses | Minimize personal-data risk through role access, authentication, secure handling, and incident response. | Owns preventive security and privacy controls; activity evidence belongs to RTR-11 and operational recovery to RTR-15. | 6 |
| RTR-11 | Log aktivitas, transparansi, dan akuntabilitas | Use traceable events, reviews, and correction records to investigate actions and improve trust. | Owns auditability and oversight; routine service metrics belong to RTR-12 and access configuration to RTR-10. | 6 |
| RTR-12 | Laporan, ekspor, dan retensi arsip | Produce useful operational reports and controlled exports while managing versions, retention, and disposal. | Owns reporting and records output; master-data maintenance belongs to RTR-06 and audit-event evidence to RTR-11. | 6 |
| RTR-13 | Komunikasi, bantuan, dan pengaduan warga | Help residents find officers, understand service status, correct problems, and escalate complaints fairly. | Owns human communication and support; transactional request steps belong to RTR-03 and governance escalation to RTR-08. | 6 |
| RTR-14 | Adopsi digital dan aksesibilitas layanan | Introduce digital service inclusively for residents and officers with different devices, abilities, and literacy levels. | Owns adoption, assisted service, and usability; technical continuity belongs to RTR-15 and procurement to RTR-16. | 6 |
| RTR-15 | Operasi, migrasi, dan keberlangsungan sistem | Keep service available through backups, recovery, data migration, support, updates, and fallback procedures. | Owns technical operations and continuity; privacy policy belongs to RTR-10 and rollout governance to RTR-16. | 6 |
| RTR-16 | Implementasi, pengadaan, dan evaluasi SILAS | Assess readiness, choose a solution or vendor, stage rollout, set responsibilities, and measure outcomes. | Owns program and commercial decisions; daily operation belongs to RTR-15 and the live application owns transactions. | 6 |

## Internal-link rule

Every article links upward to its RTR topic hub. RTR-01 routes readers to the correct resident, officer, data, or implementation cluster. Service-type pages in RTR-02 link to the resident journey in RTR-03 and officer checks in RTR-04; those workflows link to document controls in RTR-09 and audit evidence in RTR-11. Data topics link from identity intake (RTR-05) through household and territory management (RTR-06/RTR-07) to privacy (RTR-10), reporting (RTR-12), and continuity (RTR-15). Calls to use the system point to the existing SILAS runtime rather than creating competing transactional pages.

## First publication wave

Publish a coherent 12-asset foundation: `RTR-01-01`, `RTR-01-02`, `RTR-02-01`, `RTR-03-01`, `RTR-03-02`, `RTR-04-01`, `RTR-05-01`, `RTR-06-01`, `RTR-10-01`, `RTR-10-02`, `RTR-16-01`, and `RTR-16-05`. This wave establishes role boundaries, a shared service vocabulary, the end-to-end request flow, minimum identity/data safeguards, implementation readiness, and measurable service outcomes before narrower operational clusters expand.
