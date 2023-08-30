import { useMemo } from "react";
import useSession from "./useSession";
import ConceptService from "../Services/concept.service";

function useConcept() {
  const [session] = useSession();
  const $Concept = useMemo(() => (session.token ? new ConceptService(session.token) : null), [session.token]);

  return $Concept;
}

export default useConcept;
