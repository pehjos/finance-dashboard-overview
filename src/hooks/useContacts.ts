import { useAppContext } from "@/src/context/AppContext";
import { useMemo } from "react";
import type { Contact } from "@/src/types";

type UseContactsReturn = {
  contacts: Contact[];
  favoriteContacts: Contact[];
  recentContacts: Contact[];
  addContact: (contact: Contact) => void;
};

export function useContacts(): UseContactsReturn {
  const { state, addContact } = useAppContext();

  const favoriteContacts = useMemo(() => {
    return state.contacts.filter((contact: Contact) => contact.favorite);
  }, [state.contacts]);

  const recentContacts = useMemo(() => {
    return state.contacts.filter((contact: Contact) => contact.recent);
  }, [state.contacts]);

  return {
    contacts: state.contacts,
    favoriteContacts,
    recentContacts,
    addContact,
  };
}
