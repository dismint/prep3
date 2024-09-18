import SessioningConcept from "./concepts/sessioning";

// The app is a composition of concepts instantiated here
// and synchronized together in `routes.ts`.
// Right now, we only have Session-ing:
export const Sessioning = new SessioningConcept();
