import { useAppContext } from "@/src/context/AppContext";
import { useMemo } from "react";

export function useContacts() {
  const { state, addContact } = useAppContext();

  const favoriteContacts = useMemo(() => {
    return state.contacts.filter(contact => contact.favorite);
  }, [state.contacts]);

  const recentContacts = useMemo(() => {
    return state.contacts.filter(contact => contact.recent);
  }, [state.contacts]);

  return {
    contacts: state.contacts,
    favoriteContacts,
    recentContacts,
    addContact,
  };
}
