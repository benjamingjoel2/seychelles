/** @typedef {{ title: string, intro: string, sections: { h: string, html: string }[] }} LegalDoc */

/**
 * Legal page copy in every language: Privacy Policy, Booking Terms and Cookie Policy
 * (owner checklist, 1 November 2026). {brand}, {email} and {address} are filled in from the options
 * (src/lib/legal-options.js), so the text follows site.config.js. The cookie table lists exactly what
 * the site stores (plannerRoute in localStorage).
 */
const fill = (doc, o) => JSON.parse(JSON.stringify(doc).replaceAll('{brand}', o.brand).replaceAll('{email}', o.email).replaceAll('{address}', o.address));

const DOC_EN = {
 "privacy": {
  "title": "Privacy Policy",
  "intro": "How {brand} collects, uses and protects your personal data when you visit this website, send us an enquiry or book a trip. Last updated: 1 November 2026.",
  "sections": [
   {
    "h": "Who we are",
    "html": "<p>{brand} plans and arranges tailor-made trips. We are the controller of the personal data described in this policy.</p><p>Address: {address}</p><p>Email: <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "What data we collect",
    "html": "<ul><li>Enquiry details: what you enter in our enquiry form or send us by email, such as your name, email address, travel dates, number of travellers, interests, budget and your message.</li><li>Booking details: when you book, what we need to arrange your trip, such as the full names of travellers as shown in their passports, dates of birth, nationality, arrival and departure details, dietary requirements and, only if you choose to share them, health or mobility needs.</li><li>Correspondence: the emails and messages you exchange with us.</li><li>Technical data: when you visit the site, our hosting provider automatically records server logs with your IP address, browser type, the pages requested and the date and time. They are used only to run the site securely and to fix errors.</li><li>Browser storage: the small items described in our cookie policy.</li></ul><p>We do not collect payment card details through this website, and the site uses no analytics or advertising trackers.</p>"
   },
   {
    "h": "Why we use it and our legal bases",
    "html": "<ul><li>To answer your enquiry and prepare a proposal: steps taken at your request before entering into a contract, and our legitimate interest in replying to people who contact us.</li><li>To book and run your trip, including passing the necessary details to the suppliers who deliver it: performance of our contract with you.</li><li>To take account of health or mobility information you choose to share: your explicit consent, which you can withdraw at any time.</li><li>To keep the site secure and working, and to handle complaints or legal claims: our legitimate interests.</li><li>To keep accounting and tax records: compliance with our legal obligations.</li><li>To send you news, only if you have asked for it: your consent, which you can withdraw at any time.</li></ul><p>We never sell your personal data, and we do not use it for automated decision-making or profiling.</p>"
   },
   {
    "h": "Who we share it with",
    "html": "<ul><li>Vercel Inc., which hosts this website and processes the technical logs described above.</li><li>Our email provider, which stores and delivers the messages we exchange with you.</li><li>The travel suppliers who deliver your trip, such as hotels, lodges and camps, transport and transfer companies, airlines, activity providers and park or permit authorities. Each receives only what it needs for your booking.</li><li>Professional advisers, public authorities or courts, where the law requires it or to establish or defend legal claims.</li></ul><p>When you send the enquiry form, it opens your own email program with your message ready to send to us, so the form itself does not transmit your data to any third party.</p><p>Our service providers act on our instructions and must keep your data secure and confidential.</p>"
   },
   {
    "h": "International transfers",
    "html": "<p>Vercel and some of our other providers may process data in the United States and other countries. Your trip takes place in Seychelles, so the suppliers there receive the details they need. Where data protection law requires it, we rely on adequacy decisions, standard contractual clauses or equivalent safeguards, or on the transfer being necessary to perform the contract you asked us for. You can ask us for details of these safeguards.</p>"
   },
   {
    "h": "How long we keep it",
    "html": "<ul><li>Enquiries that do not lead to a booking: up to two years after our last contact.</li><li>Booking records: as long as tax and accounting law requires, usually up to seven years after your trip.</li><li>Health or mobility details: deleted once your trip is over, unless you ask us to keep them for a future trip.</li><li>Server logs: kept by our hosting provider for a short period, normally no more than 30 days.</li></ul>"
   },
   {
    "h": "How we protect it",
    "html": "<p>We keep personal data in access-controlled systems, use encrypted connections (HTTPS) on this site and share data only as described here. If a breach affects your data and puts your rights at risk, we will tell you without undue delay.</p>"
   },
   {
    "h": "Your rights",
    "html": "<p>Depending on where you live, you have the right to:</p><ul><li>access the personal data we hold about you;</li><li>have inaccurate data corrected (rectification);</li><li>have your data deleted (erasure);</li><li>restrict how we use your data (restriction);</li><li>receive your data in a portable format or have it sent to someone else (portability);</li><li>object to our use of your data based on legitimate interests, and to direct marketing at any time (objection);</li><li>withdraw your consent at any time, without affecting what we did before;</li><li>complain to a data protection supervisory authority, in particular in the country where you live or work.</li></ul><p>To exercise any of these rights, email us. We reply within one month.</p><p>Email: <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "Cookies",
    "html": "<p>This site uses only the browser storage described in our cookie policy.</p><p><a href=\"/cookies/\">Read our cookie policy</a></p>"
   },
   {
    "h": "Children",
    "html": "<p>This website is not aimed at children and we do not knowingly collect data from children under 16. We only process details of children travelling with their family when a parent or guardian gives them to us for a booking.</p>"
   },
   {
    "h": "Changes to this policy",
    "html": "<p>We may update this policy when our services or the law change. The date at the top shows when it was last updated.</p>"
   },
   {
    "h": "Contact",
    "html": "<p>Questions about this policy or your personal data: write to {brand} at the address above, or email us.</p><p>Email: <a href=\"mailto:{email}\">{email}</a></p>"
   }
  ]
 },
 "terms": {
  "title": "Booking Terms",
  "intro": "The terms that apply when you book a trip with {brand}. Please read them before you book: when you confirm a booking, you accept them. Last updated: 1 November 2026.",
  "sections": [
   {
    "h": "1. Who we are",
    "html": "<p>{brand} (“we”, “us”) plans and arranges tailor-made trips. These terms, together with your proposal and booking confirmation, form your contract with us.</p><p>Address: {address}</p><p>Email: <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "2. How a booking is made and confirmed",
    "html": "<p>Every trip starts with an enquiry. We then send you a written proposal with the itinerary, the price and what is included. Prices on this website are “from” prices per person, given as a guide; your final price is the one confirmed in writing in your proposal.</p><p>Your booking is made when you accept the proposal in writing and pay the deposit, and it is confirmed when we send you a written booking confirmation. The person who makes the booking must be at least 18 years old and accepts these terms on behalf of everyone travelling.</p>"
   },
   {
    "h": "3. Deposit, balance and prices",
    "html": "<p>A deposit, stated in your proposal, is due when you book. The balance is due on the date shown in your booking confirmation, normally 60 days before departure. If you book less than 60 days before departure, the full price is due when you book.</p><p>If the balance is not paid on time, we may treat the booking as cancelled by you and apply the cancellation charges below.</p><p>Once your booking is confirmed we will not increase the price, except where taxes, park or entry fees or fuel costs imposed by third parties change. We will tell you as soon as possible and show how the change was calculated. If the increase is more than 8% of the trip price, you may cancel and receive a full refund.</p>"
   },
   {
    "h": "4. What is included",
    "html": "<p>Your proposal and booking confirmation list exactly what is included, typically the accommodation, transport, transfers and activities in your itinerary, and the meals stated.</p><p>Unless stated otherwise, the price does not include international flights, travel insurance, visas, vaccinations, drinks, tips, personal expenses, optional activities or anything not listed as included.</p>"
   },
   {
    "h": "5. Changes by you",
    "html": "<p>If you want to change your trip after it is confirmed, tell us in writing. We will do our best to make the change, subject to availability. You pay any costs charged by suppliers and any difference in price. Changing your travel dates, or a major change close to departure, may be treated as a cancellation.</p><p>You may transfer your booking to another person who meets all the conditions of the trip by telling us in writing at least 14 days before departure. You and that person are jointly responsible for any balance and for the extra costs the transfer causes.</p>"
   },
   {
    "h": "6. Cancellation by you",
    "html": "<p>You may cancel at any time by writing to us; the cancellation takes effect on the day we receive it. Unless your booking confirmation sets different charges, we charge the following share of the total trip price:</p><ul><li>More than 60 days before departure: loss of the deposit</li><li>60 to 31 days before departure: 50% of the trip price</li><li>30 to 15 days before departure: 75% of the trip price</li><li>14 days or less before departure, or if you do not travel: 100% of the trip price</li></ul><p>Some elements, such as flights, permits and certain peak-season stays, cannot be refunded once booked; your proposal says so where this applies. Your travel insurance may cover cancellation charges.</p>"
   },
   {
    "h": "7. Changes and cancellation by us",
    "html": "<p>We plan carefully, but we sometimes have to change arrangements. If we make a minor change, such as a comparable hotel or a different route, we will tell you as soon as we can. If we have to make a significant change or cancel your trip, we will tell you promptly and you may accept the change, choose a comparable alternative, or cancel and receive a full refund of everything you have paid us.</p><p>For departures with a minimum number of travellers, we may cancel if that number is not reached, telling you at least 45 days before departure and refunding everything you have paid us.</p>"
   },
   {
    "h": "8. Travel insurance",
    "html": "<p>Travel insurance is a condition of booking. Your policy must cover cancellation, medical treatment, emergency evacuation and repatriation, and the activities in your itinerary. Please send us the policy details before you travel.</p>"
   },
   {
    "h": "9. Passports, visas and health",
    "html": "<p>You are responsible for holding a valid passport, any visas or entry permits, and the vaccinations and health documents your trip requires, and for checking the rules that apply to your nationality. Entry and health rules change; we share the information we have, but please confirm it with the relevant embassy, official government sources and your doctor before you travel.</p>"
   },
   {
    "h": "10. Our responsibility",
    "html": "<p>We are responsible for arranging the services in your booking confirmation with reasonable skill and care. If any part of your trip is not provided as agreed, tell the supplier and us straight away so we can try to put it right.</p><p>We are not responsible for loss, damage or delay caused by you or a member of your party, by a third party unconnected with the services we arranged, or by unusual and unforeseeable circumstances beyond our control. Where international conventions limit a supplier’s liability, for example for flights, our liability is limited in the same way. Except for death or personal injury caused by our negligence, our liability is limited to the total price of your trip. Nothing in these terms limits rights you have under consumer law that cannot be excluded.</p>"
   },
   {
    "h": "11. Your behaviour",
    "html": "<p>Please respect the laws and customs of the places you visit, follow the safety instructions of our suppliers and local hosts, and our reasonable instructions. If your behaviour puts others at risk or seriously disturbs them, we or the supplier may end your trip without refund, and you will pay any costs that result.</p>"
   },
   {
    "h": "12. Complaints",
    "html": "<p>If something goes wrong during your trip, tell the supplier and us straight away so we can try to fix it on the spot. If it is not resolved, email us within 28 days of your return. We acknowledge complaints within 14 days and aim to reply in full within 28 days.</p><p>Email: <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "13. Force majeure",
    "html": "<p>We are not liable for any failure or delay caused by unusual and unforeseeable circumstances beyond our control whose consequences could not have been avoided even with all due care, such as war, civil unrest, terrorism, natural disaster, epidemic, severe weather, strikes, or the closure of airports, borders or parks. If such circumstances prevent your trip from going ahead as booked, we will offer you a comparable alternative or a refund of the money you have paid us.</p>"
   },
   {
    "h": "14. Data protection",
    "html": "<p>We use your personal data to arrange your trip, as explained in our privacy policy.</p><p><a href=\"/privacy/\">Read our privacy policy</a></p>"
   },
   {
    "h": "15. Governing law",
    "html": "<p>These terms, and any dispute arising from them, are governed by the law of Seychelles, and the courts of Seychelles have jurisdiction. If you are a consumer, you may also bring proceedings in the courts of the country where you live, and you keep the protection of the mandatory consumer law of that country.</p>"
   },
   {
    "h": "16. Contact",
    "html": "<p>Questions about these terms or your booking:</p><p>Email: <a href=\"mailto:{email}\">{email}</a></p>"
   }
  ]
 },
 "cookies": {
  "title": "Cookie Policy",
  "intro": "What the {brand} website stores in your browser, and why. Last updated: 1 November 2026.",
  "sections": [
   {
    "h": "What cookies are",
    "html": "<p>Cookies are small text files that a website saves in your browser. Similar technologies, such as local storage and session storage, let a site keep small pieces of information in your browser. In this policy, “cookies” covers all of them.</p>"
   },
   {
    "h": "What this site uses",
    "html": "<p>This site sets no cookies. It uses only the browser storage listed below, which is needed for features you choose to use.</p><div class=\"legal-table-wrap\"><table class=\"legal-table\"><thead><tr><th scope=\"col\">Name</th><th scope=\"col\">Purpose</th><th scope=\"col\">Duration</th><th scope=\"col\">Type</th></tr></thead><tbody><tr><td>plannerRoute</td><td>Carries the route you built in the island-hopping planner over to the enquiry form; removed when the enquiry is sent</td><td>Until you clear your browser storage</td><td>Local storage, essential</td></tr></tbody></table></div><p>We do not use analytics, advertising or social-media tracking cookies.</p>"
   },
   {
    "h": "Consent",
    "html": "<p>Essential items do not need your consent because the site, or a feature you ask for, cannot work without them. If we ever add cookies that are not essential, such as analytics, we will ask for your consent first and update this policy.</p>"
   },
   {
    "h": "Third-party content",
    "html": "<ul><li>This website is hosted by Vercel, which processes your IP address in its server logs to deliver the pages. Vercel sets no cookies on this site.</li><li>Some photographs are delivered from third-party image servers. Your browser sends your IP address to those servers so they can deliver the images; they set no cookies on this site.</li><li>Our fonts are served from this website, so no font provider receives your data.</li><li>We do not embed maps, videos, social-media widgets or advertising.</li></ul>"
   },
   {
    "h": "How to manage or disable cookies",
    "html": "<p>You can view and delete cookies and site data at any time in your browser settings, and you can block them altogether. Look for “cookies” or “site data” in the privacy settings of Chrome, Firefox, Safari or Edge; each browser’s help pages explain the steps.</p><p>If you block site storage, the site still works, but the planner will not pass your route to the enquiry form.</p>"
   },
   {
    "h": "Changes to this policy",
    "html": "<p>We will update this policy if the way this site uses cookies changes. The date at the top shows the latest version.</p>"
   },
   {
    "h": "Contact",
    "html": "<p>Questions about this policy:</p><p>Email: <a href=\"mailto:{email}\">{email}</a></p>"
   }
  ]
 }
};

const DOC_FR = {
 "privacy": {
  "title": "Politique de confidentialité",
  "intro": "Comment {brand} collecte, utilise et protège vos données personnelles lorsque vous consultez ce site, nous envoyez une demande ou réservez un voyage. Dernière mise à jour : 1er novembre 2026.",
  "sections": [
   {
    "h": "Qui sommes-nous",
    "html": "<p>{brand} conçoit et organise des voyages sur mesure. Nous sommes responsables du traitement des données personnelles décrites dans cette politique.</p><p>Adresse : {address}</p><p>E-mail : <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "Quelles données nous collectons",
    "html": "<ul><li>Données de demande : ce que vous saisissez dans notre formulaire de demande ou nous envoyez par e-mail, par exemple votre nom, votre adresse e-mail, vos dates de voyage, le nombre de voyageurs, vos centres d’intérêt, votre budget et votre message.</li><li>Données de réservation : lorsque vous réservez, ce dont nous avons besoin pour organiser votre voyage, par exemple les noms complets des voyageurs tels qu’ils figurent sur leur passeport, les dates de naissance, la nationalité, les informations d’arrivée et de départ, les régimes alimentaires et, uniquement si vous choisissez de nous les communiquer, des besoins liés à la santé ou à la mobilité.</li><li>Correspondance : les e-mails et messages que vous échangez avec nous.</li><li>Données techniques : lorsque vous consultez le site, notre hébergeur enregistre automatiquement des journaux de serveur contenant votre adresse IP, le type de navigateur, les pages demandées ainsi que la date et l’heure. Ils servent uniquement à faire fonctionner le site en sécurité et à corriger les erreurs.</li><li>Stockage dans le navigateur : les petits éléments décrits dans notre politique relative aux cookies.</li></ul><p>Nous ne collectons aucune donnée de carte bancaire sur ce site, et le site n’utilise aucun outil d’analyse d’audience ni traceur publicitaire.</p>"
   },
   {
    "h": "Pourquoi nous les utilisons et sur quelles bases légales",
    "html": "<ul><li>Répondre à votre demande et préparer une proposition : mesures précontractuelles prises à votre demande, et notre intérêt légitime à répondre aux personnes qui nous contactent.</li><li>Réserver et organiser votre voyage, y compris transmettre les informations nécessaires aux prestataires qui le réalisent : exécution de notre contrat avec vous.</li><li>Tenir compte des informations de santé ou de mobilité que vous choisissez de partager : votre consentement explicite, que vous pouvez retirer à tout moment.</li><li>Assurer la sécurité et le bon fonctionnement du site, et traiter les réclamations ou litiges : nos intérêts légitimes.</li><li>Tenir notre comptabilité et nos registres fiscaux : respect de nos obligations légales.</li><li>Vous envoyer des nouvelles, uniquement si vous l’avez demandé : votre consentement, que vous pouvez retirer à tout moment.</li></ul><p>Nous ne vendons jamais vos données personnelles et ne les utilisons ni pour des décisions automatisées ni pour du profilage.</p>"
   },
   {
    "h": "Avec qui nous les partageons",
    "html": "<ul><li>Vercel Inc., qui héberge ce site et traite les journaux techniques décrits ci-dessus.</li><li>Notre fournisseur de messagerie, qui stocke et achemine les e-mails que nous échangeons avec vous.</li><li>Les prestataires qui réalisent votre voyage, comme les hôtels, lodges et camps, les sociétés de transport et de transfert, les compagnies aériennes, les prestataires d’activités et les autorités des parcs ou délivrant les permis. Chacun ne reçoit que ce dont il a besoin pour votre réservation.</li><li>Des conseillers professionnels, des autorités publiques ou des tribunaux, lorsque la loi l’exige ou pour constater, exercer ou défendre des droits en justice.</li></ul><p>Lorsque vous envoyez le formulaire de demande, il ouvre votre propre messagerie avec votre message prêt à nous être envoyé : le formulaire lui-même ne transmet vos données à aucun tiers.</p><p>Nos prestataires agissent sur nos instructions et doivent garantir la sécurité et la confidentialité de vos données.</p>"
   },
   {
    "h": "Transferts internationaux",
    "html": "<p>Vercel et certains de nos autres prestataires peuvent traiter des données aux États-Unis et dans d’autres pays. Votre voyage a lieu aux Seychelles : les prestataires sur place reçoivent les informations dont ils ont besoin. Lorsque la loi sur la protection des données l’exige, nous nous appuyons sur des décisions d’adéquation, des clauses contractuelles types ou des garanties équivalentes, ou sur le fait que le transfert est nécessaire à l’exécution du contrat que vous nous avez demandé. Vous pouvez nous demander le détail de ces garanties.</p>"
   },
   {
    "h": "Durée de conservation",
    "html": "<ul><li>Demandes sans réservation : jusqu’à deux ans après notre dernier échange.</li><li>Dossiers de réservation : aussi longtemps que l’exige la législation fiscale et comptable, en général jusqu’à sept ans après votre voyage.</li><li>Informations de santé ou de mobilité : supprimées à la fin de votre voyage, sauf si vous nous demandez de les conserver pour un prochain voyage.</li><li>Journaux de serveur : conservés par notre hébergeur pendant une courte durée, en principe 30 jours au maximum.</li></ul>"
   },
   {
    "h": "Comment nous les protégeons",
    "html": "<p>Nous conservons les données personnelles dans des systèmes à accès contrôlé, utilisons des connexions chiffrées (HTTPS) sur ce site et ne partageons les données que dans les conditions décrites ici. Si une violation touche vos données et présente un risque pour vos droits, nous vous en informerons dans les meilleurs délais.</p>"
   },
   {
    "h": "Vos droits",
    "html": "<p>Selon votre lieu de résidence, vous avez le droit :</p><ul><li>d’accéder aux données personnelles que nous détenons sur vous ;</li><li>de faire corriger des données inexactes (rectification) ;</li><li>de faire effacer vos données (effacement) ;</li><li>de limiter l’utilisation de vos données (limitation) ;</li><li>de recevoir vos données dans un format portable ou de les faire transmettre à un tiers (portabilité) ;</li><li>de vous opposer à l’utilisation de vos données fondée sur nos intérêts légitimes, et à tout moment à la prospection (opposition) ;</li><li>de retirer votre consentement à tout moment, sans effet sur les traitements antérieurs ;</li><li>d’introduire une réclamation auprès d’une autorité de contrôle de la protection des données, notamment dans le pays où vous vivez ou travaillez.</li></ul><p>Pour exercer l’un de ces droits, écrivez-nous par e-mail. Nous répondons sous un mois.</p><p>E-mail : <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "Cookies",
    "html": "<p>Ce site utilise uniquement le stockage dans le navigateur décrit dans notre politique relative aux cookies.</p><p><a href=\"/cookies/\">Lire notre politique relative aux cookies</a></p>"
   },
   {
    "h": "Enfants",
    "html": "<p>Ce site ne s’adresse pas aux enfants et nous ne collectons pas sciemment de données concernant des enfants de moins de 16 ans. Nous ne traitons les informations d’enfants voyageant en famille que lorsqu’un parent ou tuteur nous les transmet pour une réservation.</p>"
   },
   {
    "h": "Modifications de cette politique",
    "html": "<p>Nous pouvons mettre à jour cette politique lorsque nos services ou la loi évoluent. La date en haut de la page indique la dernière mise à jour.</p>"
   },
   {
    "h": "Contact",
    "html": "<p>Pour toute question sur cette politique ou vos données personnelles, écrivez à {brand} à l’adresse ci-dessus ou par e-mail.</p><p>E-mail : <a href=\"mailto:{email}\">{email}</a></p>"
   }
  ]
 },
 "terms": {
  "title": "Conditions de réservation",
  "intro": "Les conditions qui s’appliquent lorsque vous réservez un voyage avec {brand}. Lisez-les avant de réserver : en confirmant une réservation, vous les acceptez. Dernière mise à jour : 1er novembre 2026.",
  "sections": [
   {
    "h": "1. Qui sommes-nous",
    "html": "<p>{brand} (« nous ») conçoit et organise des voyages sur mesure. Ces conditions, avec votre proposition et votre confirmation de réservation, forment votre contrat avec nous.</p><p>Adresse : {address}</p><p>E-mail : <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "2. Comment se fait et se confirme une réservation",
    "html": "<p>Chaque voyage commence par une demande. Nous vous envoyons ensuite une proposition écrite avec l’itinéraire, le prix et les prestations incluses. Les prix affichés sur ce site sont des prix « à partir de » par personne, donnés à titre indicatif ; votre prix définitif est celui confirmé par écrit dans votre proposition.</p><p>Votre réservation est effectuée lorsque vous acceptez la proposition par écrit et versez l’acompte ; elle est confirmée lorsque nous vous envoyons une confirmation de réservation écrite. La personne qui réserve doit avoir au moins 18 ans et accepte ces conditions au nom de tous les voyageurs.</p>"
   },
   {
    "h": "3. Acompte, solde et prix",
    "html": "<p>Un acompte, indiqué dans votre proposition, est dû à la réservation. Le solde est dû à la date figurant sur votre confirmation de réservation, en général 60 jours avant le départ. Si vous réservez moins de 60 jours avant le départ, la totalité du prix est due à la réservation.</p><p>Si le solde n’est pas réglé à temps, nous pouvons considérer la réservation comme annulée par vous et appliquer les frais d’annulation ci-dessous.</p><p>Une fois votre réservation confirmée, nous n’augmentons pas le prix, sauf si des taxes, des droits d’entrée ou de parc ou des coûts de carburant imposés par des tiers changent. Nous vous en informons dès que possible en expliquant le calcul. Si la hausse dépasse 8 % du prix du voyage, vous pouvez annuler et être intégralement remboursé.</p>"
   },
   {
    "h": "4. Ce qui est inclus",
    "html": "<p>Votre proposition et votre confirmation de réservation indiquent précisément ce qui est inclus, en général l’hébergement, le transport, les transferts et les activités de votre itinéraire, ainsi que les repas mentionnés.</p><p>Sauf mention contraire, le prix ne comprend pas les vols internationaux, l’assurance voyage, les visas, les vaccins, les boissons, les pourboires, les dépenses personnelles, les activités optionnelles ni tout ce qui n’est pas indiqué comme inclus.</p>"
   },
   {
    "h": "5. Modifications de votre part",
    "html": "<p>Si vous souhaitez modifier votre voyage après confirmation, prévenez-nous par écrit. Nous ferons de notre mieux, sous réserve de disponibilité. Vous prenez en charge les frais facturés par les prestataires et l’éventuelle différence de prix. Un changement de dates, ou une modification importante peu avant le départ, peut être traité comme une annulation.</p><p>Vous pouvez céder votre réservation à une personne remplissant toutes les conditions du voyage en nous prévenant par écrit au moins 14 jours avant le départ. Vous et cette personne êtes solidairement responsables du solde et des frais supplémentaires liés à la cession.</p>"
   },
   {
    "h": "6. Annulation de votre part",
    "html": "<p>Vous pouvez annuler à tout moment en nous écrivant ; l’annulation prend effet le jour où nous la recevons. Sauf frais différents indiqués dans votre confirmation de réservation, nous facturons la part suivante du prix total du voyage :</p><ul><li>Plus de 60 jours avant le départ : perte de l’acompte</li><li>De 60 à 31 jours avant le départ : 50 % du prix du voyage</li><li>De 30 à 15 jours avant le départ : 75 % du prix du voyage</li><li>14 jours ou moins avant le départ, ou en cas de non-présentation : 100 % du prix du voyage</li></ul><p>Certaines prestations, comme les vols, les permis et certains séjours en haute saison, ne sont pas remboursables une fois réservées ; votre proposition le précise le cas échéant. Votre assurance voyage peut couvrir les frais d’annulation.</p>"
   },
   {
    "h": "7. Modifications et annulation de notre part",
    "html": "<p>Nous préparons tout avec soin, mais il nous arrive de devoir modifier des prestations. En cas de modification mineure, comme un hôtel équivalent ou un itinéraire différent, nous vous prévenons dès que possible. Si nous devons apporter une modification importante ou annuler votre voyage, nous vous prévenons rapidement et vous pouvez accepter la modification, choisir une alternative comparable, ou annuler et être intégralement remboursé de toutes les sommes versées.</p><p>Pour les départs soumis à un nombre minimum de voyageurs, nous pouvons annuler si ce nombre n’est pas atteint, en vous prévenant au moins 45 jours avant le départ et en vous remboursant toutes les sommes versées.</p>"
   },
   {
    "h": "8. Assurance voyage",
    "html": "<p>Une assurance voyage est obligatoire pour réserver. Votre contrat doit couvrir l’annulation, les frais médicaux, l’évacuation d’urgence et le rapatriement, ainsi que les activités de votre itinéraire. Merci de nous en transmettre les références avant le départ.</p>"
   },
   {
    "h": "9. Passeports, visas et santé",
    "html": "<p>Il vous appartient de disposer d’un passeport valide, des visas ou autorisations d’entrée et des vaccinations et documents sanitaires exigés pour votre voyage, et de vérifier les règles applicables à votre nationalité. Ces règles évoluent ; nous partageons les informations dont nous disposons, mais vérifiez-les auprès de l’ambassade concernée, des sources officielles et de votre médecin avant le départ.</p>"
   },
   {
    "h": "10. Notre responsabilité",
    "html": "<p>Nous sommes responsables de l’organisation des prestations de votre confirmation de réservation avec soin et diligence. Si une partie de votre voyage n’est pas fournie comme convenu, prévenez immédiatement le prestataire et nous-mêmes afin que nous puissions y remédier.</p><p>Nous ne sommes pas responsables des pertes, dommages ou retards causés par vous ou un membre de votre groupe, par un tiers étranger aux prestations organisées, ou par des circonstances exceptionnelles et inévitables indépendantes de notre volonté. Lorsque des conventions internationales limitent la responsabilité d’un prestataire, par exemple pour les vols, notre responsabilité est limitée de la même façon. Sauf en cas de décès ou de dommage corporel dû à notre négligence, notre responsabilité est limitée au prix total de votre voyage. Rien dans ces conditions ne limite les droits impératifs que vous confère le droit de la consommation.</p>"
   },
   {
    "h": "11. Votre comportement",
    "html": "<p>Merci de respecter les lois et coutumes des lieux visités, les consignes de sécurité de nos prestataires et de vos hôtes, ainsi que nos instructions raisonnables. Si votre comportement met en danger ou gêne gravement d’autres personnes, nous ou le prestataire pouvons mettre fin à votre voyage sans remboursement, et les frais qui en découlent sont à votre charge.</p>"
   },
   {
    "h": "12. Réclamations",
    "html": "<p>Si un problème survient pendant votre voyage, signalez-le immédiatement au prestataire et à nous afin que nous tentions de le régler sur place. S’il n’est pas résolu, écrivez-nous par e-mail dans les 28 jours suivant votre retour. Nous accusons réception sous 14 jours et nous efforçons de répondre sur le fond sous 28 jours.</p><p>E-mail : <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "13. Force majeure",
    "html": "<p>Nous ne sommes pas responsables d’un manquement ou d’un retard dû à des circonstances exceptionnelles et inévitables, indépendantes de notre volonté et dont les conséquences n’auraient pu être évitées malgré toutes les précautions, comme une guerre, des troubles civils, le terrorisme, une catastrophe naturelle, une épidémie, des intempéries graves, des grèves ou la fermeture d’aéroports, de frontières ou de parcs. Si de telles circonstances empêchent votre voyage d’avoir lieu comme prévu, nous vous proposons une alternative comparable ou le remboursement des sommes versées.</p>"
   },
   {
    "h": "14. Protection des données",
    "html": "<p>Nous utilisons vos données personnelles pour organiser votre voyage, comme l’explique notre politique de confidentialité.</p><p><a href=\"/privacy/\">Lire notre politique de confidentialité</a></p>"
   },
   {
    "h": "15. Droit applicable",
    "html": "<p>Ces conditions, et tout litige qui en découle, sont régis par le droit des Seychelles, et les tribunaux des Seychelles sont compétents. Si vous êtes un consommateur, vous pouvez aussi saisir les tribunaux du pays où vous résidez et vous conservez la protection des règles impératives du droit de la consommation de ce pays.</p>"
   },
   {
    "h": "16. Contact",
    "html": "<p>Pour toute question sur ces conditions ou votre réservation :</p><p>E-mail : <a href=\"mailto:{email}\">{email}</a></p>"
   }
  ]
 },
 "cookies": {
  "title": "Politique relative aux cookies",
  "intro": "Ce que le site de {brand} enregistre dans votre navigateur, et pourquoi. Dernière mise à jour : 1er novembre 2026.",
  "sections": [
   {
    "h": "Qu’est-ce qu’un cookie",
    "html": "<p>Les cookies sont de petits fichiers texte qu’un site enregistre dans votre navigateur. Des technologies similaires, comme le stockage local et le stockage de session, permettent à un site de conserver de petites informations dans votre navigateur. Dans cette politique, le terme « cookies » les couvre toutes.</p>"
   },
   {
    "h": "Ce que ce site utilise",
    "html": "<p>Ce site ne dépose aucun cookie. Il utilise uniquement le stockage dans le navigateur listé ci-dessous, nécessaire aux fonctions que vous choisissez d’utiliser.</p><div class=\"legal-table-wrap\"><table class=\"legal-table\"><thead><tr><th scope=\"col\">Nom</th><th scope=\"col\">Finalité</th><th scope=\"col\">Durée</th><th scope=\"col\">Type</th></tr></thead><tbody><tr><td>plannerRoute</td><td>Transmet l’itinéraire construit dans le planificateur d’îles au formulaire de demande ; supprimé à l’envoi de la demande</td><td>Jusqu’à ce que vous effaciez les données de votre navigateur</td><td>Stockage local, essentiel</td></tr></tbody></table></div><p>Nous n’utilisons aucun cookie d’analyse d’audience, de publicité ou de suivi par les réseaux sociaux.</p>"
   },
   {
    "h": "Consentement",
    "html": "<p>Les éléments essentiels ne nécessitent pas votre consentement, car le site, ou une fonction que vous demandez, ne peut fonctionner sans eux. Si nous ajoutons un jour des cookies non essentiels, par exemple de mesure d’audience, nous vous demanderons d’abord votre consentement et mettrons cette politique à jour.</p>"
   },
   {
    "h": "Contenus tiers",
    "html": "<ul><li>Ce site est hébergé par Vercel, qui traite votre adresse IP dans ses journaux de serveur pour afficher les pages. Vercel ne dépose aucun cookie sur ce site.</li><li>Certaines photos sont diffusées par des serveurs d’images tiers. Votre navigateur leur transmet votre adresse IP pour recevoir les images ; ils ne déposent aucun cookie sur ce site.</li><li>Nos polices de caractères sont hébergées sur ce site : aucun fournisseur de polices ne reçoit vos données.</li><li>Nous n’intégrons ni cartes, ni vidéos, ni modules de réseaux sociaux, ni publicité.</li></ul>"
   },
   {
    "h": "Gérer ou désactiver les cookies",
    "html": "<p>Vous pouvez à tout moment consulter et supprimer les cookies et données de site dans les paramètres de votre navigateur, ou les bloquer entièrement. Cherchez « cookies » ou « données de site » dans les paramètres de confidentialité de Chrome, Firefox, Safari ou Edge ; l’aide de chaque navigateur détaille la marche à suivre.</p><p>Si vous bloquez le stockage, le site fonctionne toujours, mais le planificateur ne transmettra pas votre itinéraire au formulaire.</p>"
   },
   {
    "h": "Modifications de cette politique",
    "html": "<p>Nous mettrons cette politique à jour si l’usage des cookies sur ce site change. La date en haut de la page indique la dernière version.</p>"
   },
   {
    "h": "Contact",
    "html": "<p>Pour toute question sur cette politique :</p><p>E-mail : <a href=\"mailto:{email}\">{email}</a></p>"
   }
  ]
 }
};

const DOC_DE = {
 "privacy": {
  "title": "Datenschutzerklärung",
  "intro": "Wie {brand} Ihre personenbezogenen Daten erhebt, nutzt und schützt, wenn Sie diese Website besuchen, uns eine Anfrage senden oder eine Reise buchen. Zuletzt aktualisiert: 1. November 2026.",
  "sections": [
   {
    "h": "Wer wir sind",
    "html": "<p>{brand} plant und organisiert maßgeschneiderte Reisen. Wir sind Verantwortlicher für die in dieser Erklärung beschriebenen personenbezogenen Daten.</p><p>Anschrift: {address}</p><p>E-Mail: <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "Welche Daten wir erheben",
    "html": "<ul><li>Anfragedaten: was Sie in unser Anfrageformular eingeben oder uns per E-Mail senden, etwa Name, E-Mail-Adresse, Reisedaten, Zahl der Reisenden, Interessen, Budget und Ihre Nachricht.</li><li>Buchungsdaten: bei einer Buchung, was wir zur Organisation Ihrer Reise brauchen, etwa die vollständigen Namen der Reisenden laut Reisepass, Geburtsdaten, Staatsangehörigkeit, An- und Abreisedaten, Ernährungswünsche und, nur wenn Sie sie uns mitteilen möchten, gesundheitliche Bedürfnisse oder Mobilitätsbedürfnisse.</li><li>Korrespondenz: die E-Mails und Nachrichten, die Sie mit uns austauschen.</li><li>Technische Daten: Beim Besuch der Website speichert unser Hosting-Anbieter automatisch Serverprotokolle mit Ihrer IP-Adresse, dem Browsertyp, den aufgerufenen Seiten sowie Datum und Uhrzeit. Sie dienen nur dem sicheren Betrieb der Website und der Fehlerbehebung.</li><li>Speicher im Browser: die kleinen Einträge, die in unserer Cookie-Richtlinie beschrieben sind.</li></ul><p>Wir erheben über diese Website keine Zahlungskartendaten, und die Website nutzt keine Analyse- oder Werbe-Tracker.</p>"
   },
   {
    "h": "Wozu wir sie nutzen und auf welcher Rechtsgrundlage",
    "html": "<ul><li>Beantwortung Ihrer Anfrage und Erstellung eines Angebots: vorvertragliche Maßnahmen auf Ihre Anfrage sowie unser berechtigtes Interesse, Menschen zu antworten, die uns kontaktieren.</li><li>Buchung und Durchführung Ihrer Reise, einschließlich der Weitergabe der nötigen Angaben an die ausführenden Leistungsträger: Erfüllung unseres Vertrags mit Ihnen.</li><li>Berücksichtigung von Gesundheits- oder Mobilitätsangaben, die Sie uns freiwillig mitteilen: Ihre ausdrückliche Einwilligung, die Sie jederzeit widerrufen können.</li><li>Sicherer und funktionsfähiger Betrieb der Website sowie Bearbeitung von Beschwerden oder Rechtsansprüchen: unsere berechtigten Interessen.</li><li>Führung von Buchhaltungs- und Steuerunterlagen: Erfüllung unserer rechtlichen Pflichten.</li><li>Zusendung von Neuigkeiten, nur wenn Sie darum gebeten haben: Ihre Einwilligung, die Sie jederzeit widerrufen können.</li></ul><p>Wir verkaufen Ihre personenbezogenen Daten niemals und nutzen sie weder für automatisierte Entscheidungen noch für Profiling.</p>"
   },
   {
    "h": "An wen wir sie weitergeben",
    "html": "<ul><li>Vercel Inc., das diese Website hostet und die oben beschriebenen technischen Protokolle verarbeitet.</li><li>Unser E-Mail-Anbieter, der die Nachrichten speichert und zustellt, die wir mit Ihnen austauschen.</li><li>Die Leistungsträger, die Ihre Reise durchführen, etwa Hotels, Lodges und Camps, Transport- und Transferunternehmen, Fluggesellschaften, Anbieter von Aktivitäten sowie Park- und Genehmigungsbehörden. Jeder erhält nur, was er für Ihre Buchung braucht.</li><li>Berater, Behörden oder Gerichte, wenn das Gesetz es verlangt oder um Rechtsansprüche geltend zu machen oder abzuwehren.</li></ul><p>Wenn Sie das Anfrageformular absenden, öffnet es Ihr eigenes E-Mail-Programm mit Ihrer Nachricht an uns; das Formular selbst übermittelt Ihre Daten an keinen Dritten.</p><p>Unsere Dienstleister handeln nach unseren Weisungen und müssen Ihre Daten sicher und vertraulich behandeln.</p>"
   },
   {
    "h": "Internationale Übermittlungen",
    "html": "<p>Vercel und einige unserer anderen Dienstleister können Daten in den Vereinigten Staaten und anderen Ländern verarbeiten. Ihre Reise findet auf den Seychellen statt, daher erhalten die Leistungsträger vor Ort die Angaben, die sie brauchen. Wo das Datenschutzrecht es verlangt, stützen wir uns auf Angemessenheitsbeschlüsse, Standardvertragsklauseln oder gleichwertige Garantien oder darauf, dass die Übermittlung zur Erfüllung des von Ihnen gewünschten Vertrags erforderlich ist. Auf Anfrage nennen wir Ihnen diese Garantien.</p>"
   },
   {
    "h": "Wie lange wir sie speichern",
    "html": "<ul><li>Anfragen ohne Buchung: bis zu zwei Jahre nach unserem letzten Kontakt.</li><li>Buchungsunterlagen: so lange, wie Steuer- und Handelsrecht es verlangen, in der Regel bis zu sieben Jahre nach Ihrer Reise.</li><li>Gesundheits- oder Mobilitätsangaben: werden nach Ende Ihrer Reise gelöscht, sofern Sie uns nicht bitten, sie für eine künftige Reise aufzubewahren.</li><li>Serverprotokolle: werden von unserem Hosting-Anbieter nur kurz gespeichert, in der Regel höchstens 30 Tage.</li></ul>"
   },
   {
    "h": "Wie wir sie schützen",
    "html": "<p>Wir speichern personenbezogene Daten in zugriffsgeschützten Systemen, nutzen auf dieser Website verschlüsselte Verbindungen (HTTPS) und geben Daten nur wie hier beschrieben weiter. Betrifft eine Datenpanne Ihre Daten und gefährdet sie Ihre Rechte, informieren wir Sie unverzüglich.</p>"
   },
   {
    "h": "Ihre Rechte",
    "html": "<p>Je nach Wohnsitz haben Sie das Recht,</p><ul><li>Auskunft über die personenbezogenen Daten zu erhalten, die wir über Sie speichern;</li><li>unrichtige Daten berichtigen zu lassen (Berichtigung);</li><li>Ihre Daten löschen zu lassen (Löschung);</li><li>die Verarbeitung Ihrer Daten einschränken zu lassen (Einschränkung);</li><li>Ihre Daten in einem übertragbaren Format zu erhalten oder an einen Dritten übermitteln zu lassen (Datenübertragbarkeit);</li><li>der Verarbeitung auf Grundlage berechtigter Interessen und jederzeit der Direktwerbung zu widersprechen (Widerspruch);</li><li>eine Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen;</li><li>sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren, insbesondere in dem Land, in dem Sie leben oder arbeiten.</li></ul><p>Um eines dieser Rechte auszuüben, schreiben Sie uns eine E-Mail. Wir antworten innerhalb eines Monats.</p><p>E-Mail: <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "Cookies",
    "html": "<p>Diese Website nutzt nur den in unserer Cookie-Richtlinie beschriebenen Browserspeicher.</p><p><a href=\"/cookies/\">Unsere Cookie-Richtlinie lesen</a></p>"
   },
   {
    "h": "Kinder",
    "html": "<p>Diese Website richtet sich nicht an Kinder, und wir erheben wissentlich keine Daten von Kindern unter 16 Jahren. Angaben zu Kindern, die mit ihrer Familie reisen, verarbeiten wir nur, wenn ein Elternteil oder Erziehungsberechtigter sie uns für eine Buchung mitteilt.</p>"
   },
   {
    "h": "Änderungen dieser Erklärung",
    "html": "<p>Wir können diese Erklärung aktualisieren, wenn sich unsere Leistungen oder die Rechtslage ändern. Das Datum oben zeigt die letzte Aktualisierung.</p>"
   },
   {
    "h": "Kontakt",
    "html": "<p>Fragen zu dieser Erklärung oder Ihren personenbezogenen Daten richten Sie bitte an {brand} unter der oben genannten Anschrift oder per E-Mail.</p><p>E-Mail: <a href=\"mailto:{email}\">{email}</a></p>"
   }
  ]
 },
 "terms": {
  "title": "Buchungsbedingungen",
  "intro": "Die Bedingungen, die gelten, wenn Sie eine Reise bei {brand} buchen. Bitte lesen Sie sie vor der Buchung: Mit Ihrer Buchung akzeptieren Sie sie. Zuletzt aktualisiert: 1. November 2026.",
  "sections": [
   {
    "h": "1. Wer wir sind",
    "html": "<p>{brand} („wir“, „uns“) plant und organisiert maßgeschneiderte Reisen. Diese Bedingungen bilden zusammen mit Ihrem Angebot und Ihrer Buchungsbestätigung Ihren Vertrag mit uns.</p><p>Anschrift: {address}</p><p>E-Mail: <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "2. Wie eine Buchung zustande kommt",
    "html": "<p>Jede Reise beginnt mit einer Anfrage. Danach senden wir Ihnen ein schriftliches Angebot mit Reiseverlauf, Preis und Leistungen. Die Preise auf dieser Website sind „ab“-Preise pro Person und dienen zur Orientierung; maßgeblich ist der in Ihrem Angebot schriftlich bestätigte Preis.</p><p>Ihre Buchung erfolgt, wenn Sie das Angebot schriftlich annehmen und die Anzahlung leisten; sie ist verbindlich, sobald wir Ihnen eine schriftliche Buchungsbestätigung senden. Die buchende Person muss mindestens 18 Jahre alt sein und akzeptiert diese Bedingungen im Namen aller Reisenden.</p>"
   },
   {
    "h": "3. Anzahlung, Restzahlung und Preise",
    "html": "<p>Bei der Buchung ist eine in Ihrem Angebot genannte Anzahlung fällig. Der Restbetrag ist zu dem in Ihrer Buchungsbestätigung genannten Termin fällig, in der Regel 60 Tage vor Abreise. Buchen Sie weniger als 60 Tage vor Abreise, ist der volle Preis bei Buchung fällig.</p><p>Wird der Restbetrag nicht fristgerecht gezahlt, können wir die Buchung als von Ihnen storniert behandeln und die unten genannten Stornogebühren berechnen.</p><p>Nach der Buchungsbestätigung erhöhen wir den Preis nicht, es sei denn, von Dritten erhobene Steuern, Park- oder Eintrittsgebühren oder Treibstoffkosten ändern sich. Wir informieren Sie so früh wie möglich und erläutern die Berechnung. Beträgt die Erhöhung mehr als 8 % des Reisepreises, können Sie kostenlos zurücktreten und erhalten alle Zahlungen zurück.</p>"
   },
   {
    "h": "4. Leistungen",
    "html": "<p>Ihr Angebot und Ihre Buchungsbestätigung führen genau auf, was enthalten ist, in der Regel Unterkunft, Transport, Transfers und Aktivitäten laut Reiseverlauf sowie die genannten Mahlzeiten.</p><p>Sofern nicht anders angegeben, sind internationale Flüge, Reiseversicherung, Visa, Impfungen, Getränke, Trinkgelder, persönliche Ausgaben, optionale Aktivitäten und alles nicht als enthalten Genannte nicht im Preis inbegriffen.</p>"
   },
   {
    "h": "5. Änderungen durch Sie",
    "html": "<p>Möchten Sie Ihre Reise nach der Bestätigung ändern, teilen Sie uns dies schriftlich mit. Wir bemühen uns um die Änderung, je nach Verfügbarkeit. Sie tragen die Kosten der Leistungsträger und einen etwaigen Preisunterschied. Eine Änderung der Reisedaten oder eine größere Änderung kurz vor Abreise kann als Stornierung behandelt werden.</p><p>Sie können Ihre Buchung auf eine andere Person übertragen, die alle Reisebedingungen erfüllt, wenn Sie uns dies spätestens 14 Tage vor Abreise schriftlich mitteilen. Sie und diese Person haften gemeinsam für den Restbetrag und die durch die Übertragung entstehenden Mehrkosten.</p>"
   },
   {
    "h": "6. Rücktritt durch Sie",
    "html": "<p>Sie können jederzeit schriftlich zurücktreten; maßgeblich ist der Tag, an dem Ihre Erklärung bei uns eingeht. Sofern Ihre Buchungsbestätigung keine anderen Gebühren nennt, berechnen wir folgenden Anteil des Gesamtreisepreises:</p><ul><li>Mehr als 60 Tage vor Abreise: Verlust der Anzahlung</li><li>60 bis 31 Tage vor Abreise: 50 % des Reisepreises</li><li>30 bis 15 Tage vor Abreise: 75 % des Reisepreises</li><li>14 Tage oder weniger vor Abreise oder bei Nichtantritt: 100 % des Reisepreises</li></ul><p>Einige Leistungen wie Flüge, Genehmigungen und manche Aufenthalte in der Hauptsaison sind nach der Buchung nicht erstattungsfähig; Ihr Angebot weist darauf hin. Ihre Reiseversicherung kann Stornokosten abdecken.</p>"
   },
   {
    "h": "7. Änderungen und Absage durch uns",
    "html": "<p>Wir planen sorgfältig, müssen aber gelegentlich Leistungen ändern. Bei geringfügigen Änderungen, etwa einem vergleichbaren Hotel oder einer anderen Route, informieren wir Sie so bald wie möglich. Müssen wir die Reise erheblich ändern oder absagen, informieren wir Sie umgehend; Sie können die Änderung annehmen, eine vergleichbare Alternative wählen oder zurücktreten und erhalten alle Zahlungen vollständig zurück.</p><p>Bei Abreisen mit Mindestteilnehmerzahl können wir absagen, wenn diese nicht erreicht wird; wir informieren Sie spätestens 45 Tage vor Abreise und erstatten alle Zahlungen.</p>"
   },
   {
    "h": "8. Reiseversicherung",
    "html": "<p>Eine Reiseversicherung ist Voraussetzung für die Buchung. Sie muss Reiserücktritt, medizinische Behandlung, Notfallevakuierung und Rücktransport sowie die Aktivitäten Ihres Reiseverlaufs abdecken. Bitte senden Sie uns die Policendaten vor der Abreise.</p>"
   },
   {
    "h": "9. Pässe, Visa und Gesundheit",
    "html": "<p>Sie sind selbst dafür verantwortlich, einen gültigen Reisepass, erforderliche Visa oder Einreisegenehmigungen sowie die für Ihre Reise nötigen Impfungen und Gesundheitsnachweise zu besitzen und die für Ihre Staatsangehörigkeit geltenden Regeln zu prüfen. Einreise- und Gesundheitsbestimmungen ändern sich; wir teilen unsere Informationen mit Ihnen, bitte prüfen Sie sie aber vor der Reise bei der zuständigen Botschaft, bei offiziellen Stellen und bei Ihrem Arzt.</p>"
   },
   {
    "h": "10. Unsere Haftung",
    "html": "<p>Wir sind dafür verantwortlich, die Leistungen Ihrer Buchungsbestätigung mit angemessener Sorgfalt zu organisieren. Wird ein Teil Ihrer Reise nicht wie vereinbart erbracht, informieren Sie bitte sofort den Leistungsträger und uns, damit wir Abhilfe schaffen können.</p><p>Wir haften nicht für Verluste, Schäden oder Verspätungen, die von Ihnen oder einem Mitreisenden, von einem an den vereinbarten Leistungen unbeteiligten Dritten oder durch unvermeidbare, außergewöhnliche Umstände außerhalb unserer Kontrolle verursacht werden. Soweit internationale Abkommen die Haftung eines Leistungsträgers begrenzen, etwa bei Flügen, ist unsere Haftung ebenso begrenzt. Außer bei Tod oder Körperverletzung durch unser Verschulden ist unsere Haftung auf den Gesamtreisepreis begrenzt. Zwingende Verbraucherrechte bleiben von diesen Bedingungen unberührt.</p>"
   },
   {
    "h": "11. Ihr Verhalten",
    "html": "<p>Bitte respektieren Sie Gesetze und Bräuche der besuchten Orte und folgen Sie den Sicherheitsanweisungen unserer Leistungsträger und Gastgeber sowie unseren angemessenen Anweisungen. Gefährdet oder stört Ihr Verhalten andere erheblich, können wir oder der Leistungsträger Ihre Reise ohne Erstattung beenden; daraus entstehende Kosten tragen Sie.</p>"
   },
   {
    "h": "12. Beschwerden",
    "html": "<p>Geht während Ihrer Reise etwas schief, informieren Sie bitte sofort den Leistungsträger und uns, damit wir es vor Ort beheben können. Wird es nicht gelöst, schreiben Sie uns innerhalb von 28 Tagen nach Ihrer Rückkehr eine E-Mail. Wir bestätigen Beschwerden innerhalb von 14 Tagen und antworten möglichst innerhalb von 28 Tagen vollständig.</p><p>E-Mail: <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "13. Höhere Gewalt",
    "html": "<p>Wir haften nicht für Nichterfüllung oder Verzögerungen aufgrund unvermeidbarer, außergewöhnlicher Umstände außerhalb unserer Kontrolle, deren Folgen sich auch bei aller Sorgfalt nicht hätten vermeiden lassen, etwa Krieg, Unruhen, Terrorismus, Naturkatastrophen, Epidemien, Unwetter, Streiks oder die Schließung von Flughäfen, Grenzen oder Parks. Verhindern solche Umstände die Reise wie gebucht, bieten wir Ihnen eine vergleichbare Alternative oder die Erstattung Ihrer Zahlungen an.</p>"
   },
   {
    "h": "14. Datenschutz",
    "html": "<p>Wir nutzen Ihre personenbezogenen Daten zur Organisation Ihrer Reise, wie in unserer Datenschutzerklärung erläutert.</p><p><a href=\"/privacy/\">Unsere Datenschutzerklärung lesen</a></p>"
   },
   {
    "h": "15. Anwendbares Recht",
    "html": "<p>Für diese Bedingungen und alle daraus entstehenden Streitigkeiten gilt das Recht der Seychellen; zuständig sind die Gerichte der Seychellen. Als Verbraucher können Sie auch vor den Gerichten Ihres Wohnsitzlandes klagen und behalten den Schutz der zwingenden Verbraucherschutzvorschriften dieses Landes.</p>"
   },
   {
    "h": "16. Kontakt",
    "html": "<p>Fragen zu diesen Bedingungen oder Ihrer Buchung:</p><p>E-Mail: <a href=\"mailto:{email}\">{email}</a></p>"
   }
  ]
 },
 "cookies": {
  "title": "Cookie-Richtlinie",
  "intro": "Was die Website von {brand} in Ihrem Browser speichert und warum. Zuletzt aktualisiert: 1. November 2026.",
  "sections": [
   {
    "h": "Was Cookies sind",
    "html": "<p>Cookies sind kleine Textdateien, die eine Website in Ihrem Browser speichert. Ähnliche Technologien wie der lokale Speicher und der Sitzungsspeicher erlauben es einer Website, kleine Informationen in Ihrem Browser abzulegen. In dieser Richtlinie umfasst der Begriff „Cookies“ all diese Technologien.</p>"
   },
   {
    "h": "Was diese Website verwendet",
    "html": "<p>Diese Website setzt keine Cookies. Sie nutzt nur den unten aufgeführten Browserspeicher, der für Funktionen nötig ist, die Sie selbst verwenden.</p><div class=\"legal-table-wrap\"><table class=\"legal-table\"><thead><tr><th scope=\"col\">Name</th><th scope=\"col\">Zweck</th><th scope=\"col\">Speicherdauer</th><th scope=\"col\">Art</th></tr></thead><tbody><tr><td>plannerRoute</td><td>Übergibt die im Inselhopping-Planer erstellte Route an das Anfrageformular; wird beim Senden der Anfrage gelöscht</td><td>Bis Sie Ihren Browserspeicher löschen</td><td>Lokaler Speicher, notwendig</td></tr></tbody></table></div><p>Wir verwenden keine Analyse-, Werbe- oder Social-Media-Tracking-Cookies.</p>"
   },
   {
    "h": "Einwilligung",
    "html": "<p>Für notwendige Einträge ist keine Einwilligung erforderlich, weil die Website oder eine von Ihnen gewünschte Funktion ohne sie nicht funktioniert. Sollten wir je nicht notwendige Cookies einsetzen, etwa für Statistiken, holen wir vorher Ihre Einwilligung ein und aktualisieren diese Richtlinie.</p>"
   },
   {
    "h": "Inhalte Dritter",
    "html": "<ul><li>Diese Website wird von Vercel gehostet, das Ihre IP-Adresse in Serverprotokollen verarbeitet, um die Seiten auszuliefern. Vercel setzt auf dieser Website keine Cookies.</li><li>Einige Fotos werden von Bildservern Dritter ausgeliefert. Ihr Browser übermittelt dabei Ihre IP-Adresse, damit die Bilder geladen werden können; diese Server setzen auf dieser Website keine Cookies.</li><li>Unsere Schriftarten werden von dieser Website selbst ausgeliefert; kein Schriftanbieter erhält Ihre Daten.</li><li>Wir binden keine Karten, Videos, Social-Media-Plugins oder Werbung ein.</li></ul>"
   },
   {
    "h": "Cookies verwalten oder deaktivieren",
    "html": "<p>Sie können Cookies und Website-Daten jederzeit in Ihren Browsereinstellungen ansehen und löschen oder ganz blockieren. Suchen Sie in den Datenschutzeinstellungen von Chrome, Firefox, Safari oder Edge nach „Cookies“ oder „Website-Daten“; die Hilfeseiten des jeweiligen Browsers erklären die Schritte.</p><p>Wenn Sie den Speicher blockieren, funktioniert die Website weiterhin, aber der Planer übergibt Ihre Route nicht an das Formular.</p>"
   },
   {
    "h": "Änderungen dieser Richtlinie",
    "html": "<p>Wir aktualisieren diese Richtlinie, wenn sich der Einsatz von Cookies auf dieser Website ändert. Das Datum oben zeigt die aktuelle Fassung.</p>"
   },
   {
    "h": "Kontakt",
    "html": "<p>Fragen zu dieser Richtlinie:</p><p>E-Mail: <a href=\"mailto:{email}\">{email}</a></p>"
   }
  ]
 }
};

const DOC_ES = {
 "privacy": {
  "title": "Política de privacidad",
  "intro": "Cómo {brand} recoge, utiliza y protege sus datos personales cuando visita este sitio, nos envía una consulta o reserva un viaje. Última actualización: 1 de noviembre de 2026.",
  "sections": [
   {
    "h": "Quiénes somos",
    "html": "<p>{brand} diseña y organiza viajes a medida. Somos el responsable del tratamiento de los datos personales descritos en esta política.</p><p>Dirección: {address}</p><p>Correo electrónico: <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "Qué datos recogemos",
    "html": "<ul><li>Datos de la consulta: lo que introduce en nuestro formulario de consulta o nos envía por correo electrónico, como su nombre, dirección de correo electrónico, fechas de viaje, número de viajeros, intereses, presupuesto y su mensaje.</li><li>Datos de reserva: cuando reserva, lo que necesitamos para organizar su viaje, como los nombres completos de los viajeros tal como figuran en el pasaporte, fechas de nacimiento, nacionalidad, datos de llegada y salida, necesidades alimentarias y, solo si decide compartirlas, necesidades de salud o de movilidad.</li><li>Correspondencia: los correos electrónicos y mensajes que intercambia con nosotros.</li><li>Datos técnicos: cuando visita el sitio, nuestro proveedor de alojamiento registra automáticamente registros de servidor con su dirección IP, el tipo de navegador, las páginas solicitadas y la fecha y hora. Solo se usan para que el sitio funcione de forma segura y para corregir errores.</li><li>Almacenamiento en el navegador: los pequeños elementos descritos en nuestra política de cookies.</li></ul><p>No recogemos datos de tarjetas de pago a través de este sitio, y el sitio no utiliza herramientas de analítica ni rastreadores publicitarios.</p>"
   },
   {
    "h": "Para qué los usamos y con qué base jurídica",
    "html": "<ul><li>Responder a su consulta y preparar una propuesta: medidas precontractuales adoptadas a petición suya, y nuestro interés legítimo en responder a quienes se ponen en contacto con nosotros.</li><li>Reservar y llevar a cabo su viaje, incluida la comunicación de los datos necesarios a los proveedores que lo prestan: ejecución de nuestro contrato con usted.</li><li>Tener en cuenta la información de salud o movilidad que decida compartir: su consentimiento explícito, que puede retirar en cualquier momento.</li><li>Mantener el sitio seguro y en funcionamiento, y atender reclamaciones o acciones legales: nuestros intereses legítimos.</li><li>Llevar los registros contables y fiscales: cumplimiento de nuestras obligaciones legales.</li><li>Enviarle novedades, solo si nos lo ha pedido: su consentimiento, que puede retirar en cualquier momento.</li></ul><p>Nunca vendemos sus datos personales ni los utilizamos para decisiones automatizadas o elaboración de perfiles.</p>"
   },
   {
    "h": "Con quién los compartimos",
    "html": "<ul><li>Vercel Inc., que aloja este sitio y trata los registros técnicos descritos más arriba.</li><li>Nuestro proveedor de correo electrónico, que almacena y entrega los mensajes que intercambiamos con usted.</li><li>Los proveedores que prestan su viaje, como hoteles, lodges y campamentos, empresas de transporte y traslados, aerolíneas, proveedores de actividades y autoridades de parques o de permisos. Cada uno recibe solo lo que necesita para su reserva.</li><li>Asesores profesionales, autoridades públicas o tribunales, cuando la ley lo exija o para formular o defender reclamaciones.</li></ul><p>Al enviar el formulario de consulta se abre su propio programa de correo con el mensaje listo para enviárnoslo, de modo que el formulario no transmite sus datos a ningún tercero.</p><p>Nuestros proveedores actúan siguiendo nuestras instrucciones y deben mantener sus datos seguros y confidenciales.</p>"
   },
   {
    "h": "Transferencias internacionales",
    "html": "<p>Vercel y algunos de nuestros otros proveedores pueden tratar datos en Estados Unidos y en otros países. Su viaje tiene lugar en Seychelles, por lo que los proveedores locales reciben los datos que necesitan. Cuando la normativa de protección de datos lo exige, nos basamos en decisiones de adecuación, cláusulas contractuales tipo o garantías equivalentes, o en que la transferencia es necesaria para ejecutar el contrato que nos ha solicitado. Puede pedirnos información sobre estas garantías.</p>"
   },
   {
    "h": "Cuánto tiempo los conservamos",
    "html": "<ul><li>Consultas que no dan lugar a una reserva: hasta dos años después de nuestro último contacto.</li><li>Registros de reservas: el tiempo que exija la normativa fiscal y contable, normalmente hasta siete años después de su viaje.</li><li>Datos de salud o movilidad: se eliminan al terminar su viaje, salvo que nos pida conservarlos para un viaje futuro.</li><li>Registros de servidor: nuestro proveedor de alojamiento los conserva durante un periodo breve, normalmente no más de 30 días.</li></ul>"
   },
   {
    "h": "Cómo los protegemos",
    "html": "<p>Conservamos los datos personales en sistemas con acceso restringido, utilizamos conexiones cifradas (HTTPS) en este sitio y solo compartimos datos como se describe aquí. Si una brecha afecta a sus datos y pone en riesgo sus derechos, se lo comunicaremos sin dilación indebida.</p>"
   },
   {
    "h": "Sus derechos",
    "html": "<p>Según su lugar de residencia, tiene derecho a:</p><ul><li>acceder a los datos personales que tenemos sobre usted;</li><li>que se corrijan los datos inexactos (rectificación);</li><li>que se supriman sus datos (supresión);</li><li>limitar el uso de sus datos (limitación);</li><li>recibir sus datos en un formato portable o que se transmitan a otra persona (portabilidad);</li><li>oponerse al uso de sus datos basado en intereses legítimos y, en cualquier momento, al marketing directo (oposición);</li><li>retirar su consentimiento en cualquier momento, sin que ello afecte al tratamiento anterior;</li><li>presentar una reclamación ante una autoridad de control de protección de datos, en particular en el país donde vive o trabaja.</li></ul><p>Para ejercer cualquiera de estos derechos, escríbanos por correo electrónico. Respondemos en el plazo de un mes.</p><p>Correo electrónico: <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "Cookies",
    "html": "<p>Este sitio solo utiliza el almacenamiento en el navegador descrito en nuestra política de cookies.</p><p><a href=\"/cookies/\">Leer nuestra política de cookies</a></p>"
   },
   {
    "h": "Menores",
    "html": "<p>Este sitio no está dirigido a menores y no recogemos a sabiendas datos de menores de 16 años. Solo tratamos datos de menores que viajan con su familia cuando un progenitor o tutor nos los facilita para una reserva.</p>"
   },
   {
    "h": "Cambios en esta política",
    "html": "<p>Podemos actualizar esta política cuando cambien nuestros servicios o la ley. La fecha de arriba indica la última actualización.</p>"
   },
   {
    "h": "Contacto",
    "html": "<p>Si tiene preguntas sobre esta política o sus datos personales, escriba a {brand} a la dirección indicada arriba o por correo electrónico.</p><p>Correo electrónico: <a href=\"mailto:{email}\">{email}</a></p>"
   }
  ]
 },
 "terms": {
  "title": "Condiciones de reserva",
  "intro": "Las condiciones que se aplican cuando reserva un viaje con {brand}. Léalas antes de reservar: al confirmar una reserva, las acepta. Última actualización: 1 de noviembre de 2026.",
  "sections": [
   {
    "h": "1. Quiénes somos",
    "html": "<p>{brand} («nosotros») diseña y organiza viajes a medida. Estas condiciones, junto con su propuesta y su confirmación de reserva, constituyen su contrato con nosotros.</p><p>Dirección: {address}</p><p>Correo electrónico: <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "2. Cómo se hace y se confirma una reserva",
    "html": "<p>Cada viaje empieza con una consulta. Después le enviamos una propuesta por escrito con el itinerario, el precio y lo que incluye. Los precios de este sitio son precios «desde» por persona, a título orientativo; su precio final es el confirmado por escrito en su propuesta.</p><p>Su reserva se realiza cuando acepta la propuesta por escrito y abona el depósito, y queda confirmada cuando le enviamos una confirmación de reserva por escrito. La persona que reserva debe tener al menos 18 años y acepta estas condiciones en nombre de todos los viajeros.</p>"
   },
   {
    "h": "3. Depósito, pago final y precios",
    "html": "<p>Al reservar se abona un depósito, indicado en su propuesta. El resto se paga en la fecha que figura en su confirmación de reserva, normalmente 60 días antes de la salida. Si reserva con menos de 60 días de antelación, el precio completo se abona al reservar.</p><p>Si el pago final no se realiza a tiempo, podemos considerar la reserva cancelada por usted y aplicar los gastos de cancelación indicados más abajo.</p><p>Una vez confirmada su reserva no aumentaremos el precio, salvo que cambien impuestos, tasas de parques o de entrada o costes de combustible impuestos por terceros. Se lo comunicaremos lo antes posible y le explicaremos el cálculo. Si el aumento supera el 8 % del precio del viaje, puede cancelar y recibir el reembolso íntegro.</p>"
   },
   {
    "h": "4. Qué incluye",
    "html": "<p>Su propuesta y su confirmación de reserva detallan exactamente lo que incluye, normalmente el alojamiento, el transporte, los traslados y las actividades de su itinerario, y las comidas indicadas.</p><p>Salvo que se indique lo contrario, el precio no incluye vuelos internacionales, seguro de viaje, visados, vacunas, bebidas, propinas, gastos personales, actividades opcionales ni nada que no figure como incluido.</p>"
   },
   {
    "h": "5. Cambios por su parte",
    "html": "<p>Si desea cambiar su viaje una vez confirmado, comuníquenoslo por escrito. Haremos todo lo posible por realizar el cambio, según disponibilidad. Usted asume los gastos que cobren los proveedores y cualquier diferencia de precio. Un cambio de fechas, o un cambio importante poco antes de la salida, puede tratarse como una cancelación.</p><p>Puede ceder su reserva a otra persona que cumpla todas las condiciones del viaje avisándonos por escrito al menos 14 días antes de la salida. Usted y esa persona responden solidariamente del importe pendiente y de los gastos adicionales que cause la cesión.</p>"
   },
   {
    "h": "6. Cancelación por su parte",
    "html": "<p>Puede cancelar en cualquier momento por escrito; la cancelación surte efecto el día en que la recibimos. Salvo que su confirmación de reserva indique otros gastos, cobramos la siguiente parte del precio total del viaje:</p><ul><li>Más de 60 días antes de la salida: pérdida del depósito</li><li>De 60 a 31 días antes de la salida: 50 % del precio del viaje</li><li>De 30 a 15 días antes de la salida: 75 % del precio del viaje</li><li>14 días o menos antes de la salida, o si no se presenta: 100 % del precio del viaje</li></ul><p>Algunos elementos, como vuelos, permisos y ciertas estancias en temporada alta, no son reembolsables una vez reservados; su propuesta lo indica cuando corresponde. Su seguro de viaje puede cubrir los gastos de cancelación.</p>"
   },
   {
    "h": "7. Cambios y cancelación por nuestra parte",
    "html": "<p>Planificamos con cuidado, pero a veces tenemos que cambiar algún servicio. Si el cambio es menor, como un hotel equivalente o una ruta distinta, se lo comunicaremos lo antes posible. Si tenemos que hacer un cambio importante o cancelar su viaje, se lo diremos de inmediato y podrá aceptar el cambio, elegir una alternativa comparable o cancelar y recibir el reembolso íntegro de todo lo que nos haya pagado.</p><p>En las salidas con un número mínimo de viajeros, podemos cancelar si no se alcanza, avisándole al menos 45 días antes de la salida y reembolsándole todo lo pagado.</p>"
   },
   {
    "h": "8. Seguro de viaje",
    "html": "<p>El seguro de viaje es obligatorio para reservar. Su póliza debe cubrir la cancelación, la asistencia médica, la evacuación de emergencia y la repatriación, así como las actividades de su itinerario. Envíenos los datos de la póliza antes de viajar.</p>"
   },
   {
    "h": "9. Pasaportes, visados y salud",
    "html": "<p>Usted es responsable de tener un pasaporte válido, los visados o permisos de entrada y las vacunas y documentos sanitarios que exija su viaje, y de comprobar las normas aplicables a su nacionalidad. Las normas de entrada y sanitarias cambian; compartimos la información de que disponemos, pero confírmela con la embajada correspondiente, fuentes oficiales y su médico antes de viajar.</p>"
   },
   {
    "h": "10. Nuestra responsabilidad",
    "html": "<p>Somos responsables de organizar los servicios de su confirmación de reserva con la diligencia debida. Si alguna parte de su viaje no se presta como se acordó, avise de inmediato al proveedor y a nosotros para que podamos intentar solucionarlo.</p><p>No somos responsables de pérdidas, daños o retrasos causados por usted o un miembro de su grupo, por un tercero ajeno a los servicios contratados o por circunstancias inusuales e imprevisibles ajenas a nuestro control. Cuando los convenios internacionales limitan la responsabilidad de un proveedor, por ejemplo en los vuelos, nuestra responsabilidad se limita del mismo modo. Salvo en caso de muerte o lesiones causadas por nuestra negligencia, nuestra responsabilidad se limita al precio total de su viaje. Nada en estas condiciones limita los derechos irrenunciables que le otorga la normativa de consumo.</p>"
   },
   {
    "h": "11. Su comportamiento",
    "html": "<p>Respete las leyes y costumbres de los lugares que visite, siga las instrucciones de seguridad de nuestros proveedores y anfitriones locales y nuestras indicaciones razonables. Si su comportamiento pone en peligro o molesta gravemente a otras personas, nosotros o el proveedor podemos poner fin a su viaje sin reembolso, y usted asumirá los gastos que se deriven.</p>"
   },
   {
    "h": "12. Reclamaciones",
    "html": "<p>Si algo va mal durante su viaje, avise de inmediato al proveedor y a nosotros para que intentemos resolverlo sobre el terreno. Si no se resuelve, escríbanos por correo electrónico en los 28 días siguientes a su regreso. Acusamos recibo de las reclamaciones en 14 días y procuramos responder por completo en 28 días.</p><p>Correo electrónico: <a href=\"mailto:{email}\">{email}</a></p>"
   },
   {
    "h": "13. Fuerza mayor",
    "html": "<p>No respondemos de incumplimientos o retrasos causados por circunstancias inusuales e imprevisibles ajenas a nuestro control cuyas consecuencias no habrían podido evitarse ni con toda la diligencia debida, como guerras, disturbios, terrorismo, catástrofes naturales, epidemias, fenómenos meteorológicos graves, huelgas o el cierre de aeropuertos, fronteras o parques. Si estas circunstancias impiden que su viaje se realice como se reservó, le ofreceremos una alternativa comparable o el reembolso de lo que nos haya pagado.</p>"
   },
   {
    "h": "14. Protección de datos",
    "html": "<p>Utilizamos sus datos personales para organizar su viaje, como se explica en nuestra política de privacidad.</p><p><a href=\"/privacy/\">Leer nuestra política de privacidad</a></p>"
   },
   {
    "h": "15. Ley aplicable",
    "html": "<p>Estas condiciones, y cualquier litigio derivado de ellas, se rigen por la ley de Seychelles, y son competentes los tribunales de Seychelles. Si es usted consumidor, también puede acudir a los tribunales del país donde reside y conserva la protección de las normas imperativas de consumo de ese país.</p>"
   },
   {
    "h": "16. Contacto",
    "html": "<p>Preguntas sobre estas condiciones o su reserva:</p><p>Correo electrónico: <a href=\"mailto:{email}\">{email}</a></p>"
   }
  ]
 },
 "cookies": {
  "title": "Política de cookies",
  "intro": "Qué guarda el sitio web de {brand} en su navegador y por qué. Última actualización: 1 de noviembre de 2026.",
  "sections": [
   {
    "h": "Qué son las cookies",
    "html": "<p>Las cookies son pequeños archivos de texto que un sitio web guarda en su navegador. Tecnologías similares, como el almacenamiento local y el de sesión, permiten a un sitio guardar pequeños datos en su navegador. En esta política, «cookies» se refiere a todas ellas.</p>"
   },
   {
    "h": "Qué utiliza este sitio",
    "html": "<p>Este sitio no instala cookies. Solo utiliza el almacenamiento en el navegador que se indica a continuación, necesario para funciones que usted decide utilizar.</p><div class=\"legal-table-wrap\"><table class=\"legal-table\"><thead><tr><th scope=\"col\">Nombre</th><th scope=\"col\">Finalidad</th><th scope=\"col\">Duración</th><th scope=\"col\">Tipo</th></tr></thead><tbody><tr><td>plannerRoute</td><td>Lleva la ruta creada en el planificador de islas al formulario de consulta; se borra al enviar la consulta</td><td>Hasta que borre los datos de su navegador</td><td>Almacenamiento local, esencial</td></tr></tbody></table></div><p>No utilizamos cookies de analítica, publicidad ni seguimiento de redes sociales.</p>"
   },
   {
    "h": "Consentimiento",
    "html": "<p>Los elementos esenciales no requieren su consentimiento, porque el sitio, o una función que usted solicita, no puede funcionar sin ellos. Si alguna vez añadimos cookies no esenciales, como las de analítica, le pediremos antes su consentimiento y actualizaremos esta política.</p>"
   },
   {
    "h": "Contenido de terceros",
    "html": "<ul><li>Este sitio está alojado en Vercel, que trata su dirección IP en sus registros de servidor para servir las páginas. Vercel no instala cookies en este sitio.</li><li>Algunas fotografías se sirven desde servidores de imágenes de terceros. Su navegador les envía su dirección IP para recibir las imágenes; no instalan cookies en este sitio.</li><li>Nuestras fuentes tipográficas se sirven desde este sitio, por lo que ningún proveedor de fuentes recibe sus datos.</li><li>No insertamos mapas, vídeos, módulos de redes sociales ni publicidad.</li></ul>"
   },
   {
    "h": "Cómo gestionar o desactivar las cookies",
    "html": "<p>Puede ver y eliminar las cookies y los datos de sitios en cualquier momento desde la configuración de su navegador, o bloquearlos por completo. Busque «cookies» o «datos de sitios» en la configuración de privacidad de Chrome, Firefox, Safari o Edge; la ayuda de cada navegador explica los pasos.</p><p>Si bloquea el almacenamiento, el sitio sigue funcionando, pero el planificador no pasará su ruta al formulario.</p>"
   },
   {
    "h": "Cambios en esta política",
    "html": "<p>Actualizaremos esta política si cambia el uso de cookies en este sitio. La fecha de arriba indica la versión más reciente.</p>"
   },
   {
    "h": "Contacto",
    "html": "<p>Preguntas sobre esta política:</p><p>Correo electrónico: <a href=\"mailto:{email}\">{email}</a></p>"
   }
  ]
 }
};

/** @returns {{ privacy: LegalDoc, terms: LegalDoc, cookies: LegalDoc }} */
const legalPages = (o) => fill(DOC_EN, o);
const legalPagesFr = (o) => fill(DOC_FR, o);
const legalPagesDe = (o) => fill(DOC_DE, o);
const legalPagesEs = (o) => fill(DOC_ES, o);

const LEGAL = { en: legalPages, fr: legalPagesFr, de: legalPagesDe, es: legalPagesEs };
module.exports = { legalPages, legalPagesFr, legalPagesDe, legalPagesEs, LEGAL };
