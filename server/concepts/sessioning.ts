import { SessionData } from "express-session";
import { UnauthenticatedError } from "./errors";

export type SessionDoc = SessionData;

// This allows us to overload express session data type.
// Express session does not support non-string values over requests.
// We'll be using this to store the user _id in the session.
declare module "express-session" {
  export interface SessionData {
    user?: string;
  }
}

/**
 * concept: Sessioning [User]
 */
export default class SessioningConcept {
  start(session: SessionDoc, username: string) {
    // In Express, the session is created spontaneously when the connection is first made, so we do not need
    // to explicitly allocate a session; we only need to keep track of the user.

    // TODO: Make sure the user is logged out before allowing a new session to start.
    // Hint: Take a look at how the "end" function makes sure the user is logged in. Keep in mind that a
    // synchronization like starting a session should just consist of a series of actions that may throw
    // exceptions and should not have its own control flow.
    session.user = username;
  }

  end(session: SessionDoc) {
    this.isLoggedIn(session);
    session.user = undefined;
  }

  getUser(session: SessionDoc) {
    this.isLoggedIn(session);
    return session.user!;
  }

  isLoggedIn(session: SessionDoc) {
    if (session.user === undefined) {
      throw new UnauthenticatedError("Must be logged in!");
    }
  }
}
