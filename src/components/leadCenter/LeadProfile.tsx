import React from "react";

interface Conversation {
  id: number;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  phone?: string;
  address?: string;
}

interface LeadProfileProps {
  conversation: Conversation | null;
}

const LeadProfile: React.FC<LeadProfileProps> = ({ conversation }) => {
  if (!conversation) {
    return <div className="p-4">Select a conversation to see details</div>;
  }

  return (
    <div className="p-4">
      <img
        src="path/to/profile.jpg"
        alt="Profile"
        className="w-20 h-20 rounded-full mx-auto"
      />
      <div className="text-center mt-4">
        <div className="font-bold">{conversation.name}</div>
        <div className="text-sm text-gray-600">Phone: {conversation.phone}</div>
        <div className="text-sm text-gray-600">
          Address: {conversation.address}
        </div>
        <div className="mt-4">
          <div className="font-bold">Reminders:</div>
          <ul className="list-disc list-inside">
            <li>Reminder 1</li>
            <li>Reminder 2</li>
            {/* More reminders */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default LeadProfile;
