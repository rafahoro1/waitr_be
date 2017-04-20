Coding Challenge Guidelines
===========================

Please organize, design, test, document and deploy your code as if it were
going into production, then send us a link to the hosted repository (e.g.
Github, Bitbucket...).

Functional spec
---------------

Prototype **one** of the following projects:

1. Delivery Recommendation Service
2. Delivery Review Service

The UX/UI is totally up to you. If you like, get creative and add additional
features a user might find useful! Each specification is as light weight as possible.  Add as much
extra detail to the models as you find useful.


### Delivery Recommendation Service

Given a data set of drivers and a data set of deliveries, write a RESTful service that implements
the following [Swagger specification](specs/delivery_recommendations.yaml) such that if every
driver accepted their first recommendation, all deliveries would be completed with least amount of
missed delivery commitments.

### Delivery Review Service
Given a data set of drivers and a data set of deliveries, write a RESTful service that implements
the following [Swagger specification](specs/delivery_reviews.yaml). You should also extend the
specification to retrieve a list of reviews for a driver.

Technical spec
--------------

The architecture will be split between a backend and a web frontend, for
instance providing a JSON in/out RESTful API. Feel free to use any other
technologies provided that the general client/service architecture is
respected.

Choose **one** of the following technical tracks that best suits your skillset:

1. **Fullstack**: include both frontend and backend.
2. **Backend track**: include a minimal frontend (e.g. a static view or API
   docs). Write, document and test your API as if it will be used by other
   services.
3. **Frontend track**: include a minimal backend, or mock the data service. Focus on
making the interface as polished as possible.

### Backend

We believe there is no one-size-fits-all technology. Good engineering is about
using the right tool for the right job, and constantly learning about them.

Therefore, feel free to mention in your `README` how much experience you have
with the technical stack you choose, we will take note of that when reviewing
your challenge.

Here are some technologies we are more familiar with:

* JavaScript
* PHP

You are also free to use any web framework. If you choose to use a framework
that results in boilerplate code in the repository, please detail in your
README which code was written by you (as opposed to generated code).

### Frontend

The frontend should ideally be a single page app with a single `index.html`
linking to external JS/CSS/etc. You may take this opportunity to demonstrate
your CSS3 or HTML5 knowledge.

Host it!
--------

When you’re done, host it somewhere (e.g. on Amazon EC2, Heroku, Google
AppEngine, etc.).
