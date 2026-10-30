// Language-specific strings passed into the shared legal copy (src/lib/legal.js).
const config = require('../../site.config.js');

const T = {
  en: {
    updated: '30 October 2026',
    storage: { kind: 'Local storage', purpose: 'Carries the route you built in the island-hopping planner over to the enquiry form. Removed when the enquiry is sent.', duration: 'Until the enquiry is sent or you clear site data' },
    sent: 'The enquiry form is sent to our form-handling provider, which delivers it to our inbox.',
    mailto: 'The enquiry form does not send anything itself: it opens your own email app with your answers filled in.',
    processor: 'with our website host and email provider, who process data on our behalf under contract;',
  },
  fr: {
    updated: '30 octobre 2026',
    storage: { kind: 'Stockage local', purpose: 'Transmet l’itinéraire construit dans le planificateur d’îles au formulaire de demande. Supprimé à l’envoi de la demande.', duration: 'Jusqu’à l’envoi de la demande ou l’effacement des données du site' },
    sent: 'Le formulaire de demande est transmis à notre prestataire de formulaires, qui le remet dans notre boîte mail.',
    mailto: 'Le formulaire de demande n’envoie rien lui-même : il ouvre votre propre messagerie avec vos réponses déjà remplies.',
    processor: 'avec notre hébergeur et notre messagerie, qui traitent les données pour notre compte dans le cadre d’un contrat ;',
  },
  de: {
    updated: '30. Oktober 2026',
    storage: { kind: 'Lokaler Speicher', purpose: 'Übergibt die im Inselhopping-Planer erstellte Route an das Anfrageformular. Wird beim Senden der Anfrage gelöscht.', duration: 'Bis die Anfrage gesendet ist oder Sie die Websitedaten löschen' },
    sent: 'Das Anfrageformular wird an unseren Formulardienst übermittelt, der es an unser Postfach weiterleitet.',
    mailto: 'Das Anfrageformular sendet selbst nichts: Es öffnet Ihr eigenes E-Mail-Programm mit Ihren ausgefüllten Antworten.',
    processor: 'an unseren Hosting- und E-Mail-Anbieter, die Daten in unserem Auftrag auf vertraglicher Grundlage verarbeiten;',
  },
  es: {
    updated: '30 de octubre de 2026',
    storage: { kind: 'Almacenamiento local', purpose: 'Lleva la ruta creada en el planificador de islas al formulario de solicitud. Se borra al enviar la solicitud.', duration: 'Hasta que se envía la solicitud o borra los datos del sitio' },
    sent: 'El formulario de solicitud se envía a nuestro proveedor de formularios, que lo entrega en nuestro buzón.',
    mailto: 'El formulario de solicitud no envía nada por sí mismo: abre su propio programa de correo con sus respuestas ya rellenadas.',
    processor: 'con nuestro proveedor de alojamiento web y de correo, que tratan los datos por cuenta nuestra en virtud de un contrato;',
  },
};

module.exports = (lang) => {
  const t = T[lang];
  return {
    brand: config.brand.name,
    email: config.contact.email,
    address: config.contact.address,
    updated: t.updated,
    storage: [{ name: 'plannerRoute', ...t.storage }],
    enquiryNote: config.enquiryEndpoint ? t.sent : t.mailto,
    processors: [t.processor],
  };
};
