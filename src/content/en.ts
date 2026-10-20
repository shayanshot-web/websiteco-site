import type { Dict } from './types';

export const en: Dict = {
  lang: 'en',
  dir: 'ltr',
  locale: 'en-US',
  ogLocale: 'en_US',
  langName: 'English',
  siteName: 'Ancient Helileh',
  tagline: 'Helileh Tourist Village Rural Council, Bushehr',
  nav: {
    home: 'Home',
    about: 'About',
    stay: 'Stay',
    experiences: 'Experiences',
    gallery: 'Gallery',
    blog: 'Blog',
    events: 'Events',
    shop: 'Shop',
    contact: 'Contact',
  },
  slugs: {
    about: 'about-us',
    stay: 'stay',
    experiences: 'things-to-do',
    gallery: 'photo-gallery',
    blog: 'travel-blog',
    events: 'events-calendar',
    shop: 'craft-shop',
    contact: 'contact-us',
  },
  homeAliases: ['home-en'],
  phone: '+989176553247',
  phoneDisplay: '09176553247',
  address: 'Bushehr – Helileh – Helileh Tourist Village Rural Council (Dehyari)',
  org: 'Helileh Tourist Village Rural Council',
  home: {
    eyebrow: 'BUSHEHR · PERSIAN GULF',
    h1: 'Helileh, a tourist village by the sea',
    lead: 'Southern hospitality, local food and handmade crafts, close to the city of Bushehr, Iran.',
    ctaStay: 'Where to stay',
    ctaEvents: 'Events calendar',
    introTitle: 'A coastal village in Bushehr Province',
    introText:
      'Helileh is a coastal village near the city of Bushehr, run by the Helileh Tourist Village Rural Council (Dehyari). Visitors can meet local people, taste southern dishes and see the work of village artisans. This site is your trip planner: book a stay, find local experiences, register for events and buy handicrafts.',
    introCta: 'Read more about Helileh',
    tiles: [
      { h: 'About', p: 'Village history and culture' },
      { h: 'Stay', p: 'Eco-lodges and local homes' },
      { h: 'Things to do', p: 'Shore, table and traditions' },
      { h: 'Restaurants', p: 'Taste local cooking' },
    ],
    stayTitle: 'Stay in the heart of the village',
    stayText:
      'Browse local accommodation in Helileh and send a booking request. The village council will contact you to confirm.',
    stayCta: 'Request a booking',
    doTitle: 'What to do in Helileh',
    doItems: [
      { h: 'Sea and shoreline', p: 'Walk the beach and watch the sun set over the Persian Gulf.' },
      { h: 'Local food', p: 'Try southern home cooking and the flavours of Bushehr.' },
      { h: 'Handicrafts', p: 'Meet village artisans and buy handmade work.' },
      { h: 'Traditions and culture', p: 'Clothing, music and customs of Helileh people.' },
    ],
    eventsTitle: 'Upcoming events',
    eventsText:
      'See what is on, register or buy tickets. [Sample: the council will add event dates and names]',
    eventsCta: 'See all events',
    shopTitle: 'Crafts and souvenirs from Helileh',
    shopText:
      'Buy directly from village artisans, with delivery across Iran: pottery and vessels, woven goods and textiles, edible souvenirs, decor and gifts.',
    shopCta: 'Handicraft shop',
    contactTitle: 'Get in touch with the Helileh council',
  },
  pages: {
    about: {
      title: 'About Helileh',
      lead: 'Helileh is a coastal tourist village in Bushehr Province. The sea, southern food and the handwork of local people all meet here.',
      sections: [
        {
          h: 'Where is Helileh?',
          p: [
            'Helileh lies near the city of Bushehr on the Persian Gulf coast. [Distance from Bushehr centre and directions: to be completed with the Rural Council]',
          ],
        },
        {
          h: 'People and culture',
          p: [
            'The people of Helileh are welcoming and keep the customs of Iran’s south. [History, ceremonies and local dress: to be completed]',
          ],
        },
        {
          h: 'Before you go',
          p: [
            'Autumn to spring is more comfortable for sightseeing than the hot, humid Bushehr summer. Contact the village council to arrange your visit and bookings.',
          ],
        },
      ],
    },
    stay: {
      title: 'Stay',
      lead: 'Staying in Helileh means starting the day in the village and ending it to the sound of the sea. Choose a place and send a booking request.',
      sections: [
        {
          h: 'Choose where to stay',
          p: ['[Accommodation list with name, capacity and price to be provided by the Rural Council]'],
        },
        {
          h: 'Facilities',
          p: ['Each place lists its own facilities: [bathroom, breakfast, parking, air conditioning, etc.].'],
        },
        {
          h: 'How booking works',
          p: [
            'Fill in the inquiry form. The village team will call you to confirm dates and price. Payment is made after confirmation, in person or by the method announced.',
          ],
        },
      ],
    },
    experiences: {
      title: 'Experiences',
      lead: 'There are three ways to know Helileh: walk by the sea, sit at a local table and talk with the village artisans.',
      sections: [
        {
          h: 'Sea and shoreline',
          p: ['Walk the beach and watch the Persian Gulf sunset. [Beach names and safety notes: to be completed]'],
        },
        {
          h: 'Local food',
          p: ['Try southern dishes and the flavours of Bushehr. [Dish names and eateries: to be completed]'],
        },
        {
          h: 'Handicrafts and culture',
          p: [
            'See workshops, dress and local ceremonies up close and buy handmade work. [Crafts and artisans: to be completed]',
          ],
        },
      ],
    },
    gallery: {
      title: 'Gallery',
      lead: 'See Helileh before you travel. Photos and videos are grouped by subject.',
      sections: [
        { h: 'Photos', p: ['Filter by beach, people, food and handicrafts. Every photo has a caption.'] },
        { h: 'Videos', p: ['Short videos of the village and its events. [Video links: to be added]'] },
        { h: 'Using the images', p: ['Please contact the village council before using images in media.'] },
      ],
    },
    blog: {
      title: 'Blog',
      lead: 'Travel advice, stories about local crafts and village news in one place.',
      sections: [],
    },
    events: {
      title: 'Helileh Events',
      lead: 'See every village event in month or list view and register for each one.',
      sections: [
        {
          h: 'Monthly programme',
          p: ['Month view and event list with category filter: festival, workshop, walk.'],
        },
        {
          h: 'Registration and tickets',
          p: [
            'Free events use a registration form; paid events use tickets. A confirmation email follows your registration.',
          ],
        },
        { h: 'Stay informed', p: ['Leave your email to hear about new events.'] },
      ],
    },
    shop: {
      title: 'Handicraft Shop',
      lead: 'Buy the handwork of Helileh artisans straight from the village and have it delivered.',
      sections: [
        {
          h: 'Products',
          p: [
            'Categories: pottery and vessels, woven goods and textiles, edible souvenirs, decor and gifts. [Real products: to be completed]',
          ],
        },
        {
          h: 'Shipping and returns',
          p: ['Preparation and shipping time appear on each product page. [Return terms: to be completed]'],
        },
        {
          h: 'Buying from outside Iran',
          p: [
            'Iranian payment gateways do not accept foreign cards. For international orders, please fill in the inquiry form.',
          ],
        },
      ],
    },
    contact: {
      title: 'Contact',
      lead: 'Get in touch with the Helileh council for bookings, visit arrangements or any question.',
      sections: [
        { h: 'Ways to reach us', p: ['Management phone (Mr. Vahid Hasan Ahmadi): 09176553247'] },
        { h: 'Address', p: ['Bushehr – Helileh – Helileh Tourist Village Rural Council (Dehyari)'] },
        { h: 'Reply hours', p: ['[Reply hours: to be completed]'] },
      ],
    },
  },
  posts: [
    {
      id: 'one-day',
      slug: 'one-day-trip-helileh-3',
      title: 'One day in Helileh: a suggested plan',
      excerpt:
        'How to spend one day in Helileh: a suggested plan from morning to sunset with a beach walk, a local meal and a visit to artisans.',
      date: '2026-10-14',
      lead: 'If you only have a day, this simple plan helps you get to know Helileh without rushing.',
      sections: [
        {
          h: 'Morning: shore and village',
          p: [
            'Early morning is cooler and the beach is quiet. Walk by the sea for half an hour, then stop at the council office to learn about the village.',
          ],
        },
        {
          h: 'Travel tip',
          level: 3,
          p: ['From autumn to spring, mornings and late afternoons suit walking best. Bring a hat and water.'],
        },
        {
          h: 'Midday: a local meal',
          p: ['Try a local dish for lunch. [Name of the restaurant or lodge serving meals: to be completed]'],
        },
        {
          h: 'Afternoon: crafts and sunset',
          p: [
            'Visit artisan workshops and buy a souvenir before sunset, then watch the Persian Gulf sunset from the beach.',
          ],
        },
      ],
    },
    {
      id: 'souvenirs',
      slug: 'helileh-handicraft-souvenirs-3',
      title: 'What to buy in Helileh: a handicraft guide',
      excerpt:
        'A guide to buying souvenirs from Helileh: which handicrafts to choose, how to spot handmade quality and where to order.',
      date: '2026-10-14',
      lead: 'Handicrafts make the best travel keepsake. This guide helps you recognise handwork and choose well.',
      sections: [
        {
          h: 'Product categories',
          p: [
            'Pottery and vessels, woven goods and textiles, edible souvenirs and decor. [Introduce Helileh’s real crafts: to be completed]',
          ],
        },
        {
          h: 'How to recognise handmade work',
          level: 3,
          p: [
            'Ask the artisan about materials and how long it took. Handmade pieces usually differ a little from one another.',
          ],
        },
        {
          h: 'Buy in person or online',
          p: ['Buy at the workshop or from the Helileh online shop. Every product lists specifications and shipping time.'],
        },
        {
          h: 'For international visitors',
          p: [
            'For delivery outside Iran, fill in the inquiry form and we will quote the cost and shipping method.',
          ],
        },
      ],
    },
  ],
  ui: {
    skip: 'Skip to content',
    menu: 'Menu',
    language: 'Language',
    readMore: 'Read more',
    latestPosts: 'Latest posts',
    publishedOn: 'Published on',
    backToBlog: 'Back to the blog',
    noEvents: 'No events have been announced yet. The village programme will appear here soon.',
    shopCta: 'Place an inquiry',
    rights: 'All rights reserved.',
    phoneLabel: 'Phone',
    addressLabel: 'Address',
    form: {
      name: 'Name',
      phone: 'Phone',
      email: 'Email',
      subject: 'Subject',
      subjectOptions: ['Accommodation booking', 'Event', 'Shop', 'Other'],
      message: 'Message',
      send: 'Send message',
      sending: 'Sending…',
      success: 'Your message has been sent. We will contact you soon.',
      error: 'The message could not be sent. Please try again or call us.',
    },
    notFoundTitle: 'Page not found',
    notFoundText: 'The address you entered does not exist or has moved.',
    notFoundHome: 'Back to the home page',
  },
};
