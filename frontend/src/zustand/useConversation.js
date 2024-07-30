import {create} from 'zustand';

export const useConversation = create ((set) => ({
    selctedConversation : null,
    setSelectedConversation : (e) => set({selectedConversation: e}),
    messages : [],
    setMessages : (messages)=> set({messages}),
}));

