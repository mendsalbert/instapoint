"use client";

import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";

interface SimulatedUser {
  id: string;
  name: string;
  description: string;
  currentAction?: string;
  lastUpdate: number;
  isActive: boolean;
  recentActivity?: string;
  tokens: number;
  participationScore: number;
}

const INITIAL_USERS: SimulatedUser[] = [
  {
    id: "user1",
    name: "Sid",
    description: "wearing a white hoodie",
    currentAction: "looking at slide",
    lastUpdate: Date.now(),
    isActive: true,
    tokens: 0,
    participationScore: 85,
  },
  {
    id: "user2",
    name: "Spencer",
    description: "dark hair, wearing a black t-shirt",
    currentAction: "taking notes",
    lastUpdate: Date.now(),
    isActive: true,
    tokens: 0,
    participationScore: 80,
  },
  {
    id: "user3",
    name: "Anish",
    description: "short dark hair, wearing glasses",
    currentAction: "nodding",
    lastUpdate: Date.now(),
    isActive: true,
    tokens: 0,
    participationScore: 75,
  },
  {
    id: "user4",
    name: "Adrian",
    description: "curly hair, turquoise shirt",
    currentAction: "raised hand",
    lastUpdate: Date.now(),
    isActive: true,
    tokens: 0,
    participationScore: 70,
  },
];

const USER_ACTIONS = [
  "looking at slide intently",
  "writing notes quickly",
  "nodding in agreement",
  "looking away briefly",
  "raised hand with question",
  "appears confused",
  "checking reference material",
  "asking detailed question",
  "responding thoughtfully",
  "discussing with peer",
  "making connection to previous topic",
  "highlighting key points",
  "sketching diagram",
  "showing strong interest",
];

const USER_ACTIVITIES = [
  "moved closer to screen",
  "adjusted posture",
  "leaned forward",
  "opened notebook",
  "changed seating position",
  "grabbed water bottle",
  "fixed lighting",
  "nodded vigorously",
  "gestured while speaking",
];

interface LogEntry {
  timestamp: string;
  type: "audio" | "video" | "action";
  value: number | string;
}

export default function SimulationOverlay() {
  const [users, setUsers] = useState<SimulatedUser[]>(INITIAL_USERS);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [totalTokens, setTotalTokens] = useState(100);
  const [distributedTokens, setDistributedTokens] = useState(0);

  const getTimestamp = () => {
    return new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  // More frequent user updates
  useEffect(() => {
    const interval = setInterval(() => {
      setUsers((currentUsers) =>
        currentUsers.map((user) => {
          const shouldUpdateAction = Math.random() > 0.6; // 40% chance
          const shouldAddActivity = Math.random() > 0.8; // 20% chance

          if (!shouldUpdateAction && !shouldAddActivity) return user;

          return {
            ...user,
            currentAction: shouldUpdateAction
              ? USER_ACTIONS[Math.floor(Math.random() * USER_ACTIONS.length)]
              : user.currentAction,
            recentActivity: shouldAddActivity
              ? USER_ACTIVITIES[
                  Math.floor(Math.random() * USER_ACTIVITIES.length)
                ]
              : user.recentActivity,
            lastUpdate: Date.now(),
          };
        })
      );
    }, 800); // Update more frequently

    return () => clearInterval(interval);
  }, []);

  // More frequent log generation
  useEffect(() => {
    const interval = setInterval(() => {
      const newLog: LogEntry = {
        timestamp: getTimestamp(),
        type:
          Math.random() > 0.3
            ? Math.random() > 0.5
              ? "audio"
              : "video"
            : "action",
        value:
          Math.random() > 0.3
            ? Math.floor(Math.random() * 20)
            : "frame_captured",
      };

      setLogs((currentLogs) => {
        const newLogs = [...currentLogs, newLog];
        return newLogs.slice(-12);
      });
    }, 300); // Generate logs more frequently

    return () => clearInterval(interval);
  }, []);

  // Add token distribution logic
  useEffect(() => {
    const tokenInterval = setInterval(() => {
      if (totalTokens > distributedTokens) {
        setUsers((currentUsers) =>
          currentUsers.map((user) => {
            // Distribute tokens based on participation score and current action
            const shouldReward =
              user.participationScore > 80 && Math.random() > 0.7; // 30% chance for high performers

            if (shouldReward) {
              setDistributedTokens((prev) => prev + 1);
              return {
                ...user,
                tokens: user.tokens + 1,
                recentActivity: "Earned a Sonic Token! 🎉",
              };
            }
            return user;
          })
        );
      }
    }, 5000); // Check every 5 seconds

    return () => clearInterval(tokenInterval);
  }, [totalTokens, distributedTokens]);

  return (
    <div
      className={`fixed right-0 top-0 h-full bg-white shadow-xl border-l border-gray-200 overflow-hidden z-50 transition-all duration-300 ${
        isCollapsed ? "w-[40px]" : "w-[400px]"
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-white border border-gray-200 shadow-md rounded-l-lg p-1 -ml-[18px] hover:bg-gray-50 transition-colors"
      >
        {isCollapsed ? (
          <ChevronLeft className="h-4 w-4 text-gray-600" />
        ) : (
          <ChevronRight className="h-4 w-4 text-gray-600" />
        )}
      </button>

      <div
        className={`h-full flex flex-col p-4 bg-white ${
          isCollapsed ? "hidden" : ""
        }`}
      >
        {/* Token Status */}
        <div className="mb-4 bg-gradient-to-r from-purple-100 to-blue-100 p-3 rounded-lg border border-purple-200">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-bold text-purple-900">Sonic Tokens</h3>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-purple-700">
                {totalTokens - distributedTokens} remaining
              </span>
              <div className="h-5 w-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
                🎮
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-full h-2 overflow-hidden">
            <div
              className="bg-purple-500 h-full transition-all duration-500"
              style={{ width: `${(distributedTokens / totalTokens) * 100}%` }}
            />
          </div>
        </div>

        {/* Status Header */}
        <div className="flex items-center justify-between mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
          <h3 className="text-sm font-bold text-blue-900">Analysis View</h3>
          <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-full border border-blue-100">
            <span className="text-xs font-medium text-blue-700">
              Presenting
            </span>
            <div
              className={`h-2 w-2 rounded-full ${
                isStreaming ? "bg-green-500 animate-pulse" : "bg-red-500"
              }`}
            />
          </div>
        </div>

        {/* Console Section */}
        <div className="flex-1 overflow-hidden">
          <div className="font-mono text-xs leading-5 h-[180px] overflow-y-auto bg-zinc-900 text-green-400 p-3 rounded-lg shadow-inner mb-4">
            {logs.map((log, i) => (
              <div key={i} className="font-mono animate-fade-in">
                {log.timestamp} client.realtimeInput {log.type} {log.value}
              </div>
            ))}
          </div>

          {/* Attendees Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-gray-900">Attendees</h4>
              <span className="text-xs text-gray-500">Live Updates</span>
            </div>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
              {users.map((user) => (
                <div
                  key={user.id}
                  className="bg-white border-2 border-gray-100 p-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:border-blue-100"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">
                      {user.name}
                    </span>
                    <div className="flex items-center gap-2">
                      {user.tokens > 0 && (
                        <span className="text-xs bg-purple-100 px-2 py-1 rounded-full text-purple-700 font-medium">
                          {user.tokens} 🎮
                        </span>
                      )}
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
                        {new Date(user.lastUpdate).toLocaleTimeString()}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-700 mt-1">
                    {user.description}
                  </div>
                  <div className="text-xs text-blue-700 mt-1 font-medium bg-blue-50 px-2 py-1 rounded-full inline-block">
                    {user.currentAction}
                  </div>
                  {user.recentActivity && (
                    <div className="text-xs text-gray-600 mt-1 italic bg-gray-50 px-2 py-1 rounded-full inline-block">
                      {user.recentActivity}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Teacher Moments */}
          <div className="mt-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="font-bold text-sm text-gray-900 mb-3">
              Teacher Moments
            </h4>
            <div className="space-y-2 text-xs text-gray-700">
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                Teacher begins lecture with a 'deep dive' into...
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                Teacher introduces the concept of...
              </div>
              <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                Teacher mentions content from the last...
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Collapsed View */}
      {isCollapsed && (
        <div className="h-full w-full flex flex-col items-center pt-4 text-gray-600">
          <span className="vertical-text transform rotate-180 text-xs font-medium">
            Analysis View
          </span>
          <div
            className={`h-2 w-2 rounded-full mt-2 ${
              isStreaming ? "bg-green-500 animate-pulse" : "bg-red-500"
            }`}
          />
        </div>
      )}
    </div>
  );
}

// Add the vertical text styles
const styles = `
  @keyframes fade-in {
    from { opacity: 0.5; }
    to { opacity: 1; }
  }
  .animate-fade-in {
    animation: fade-in 0.3s ease-in-out;
  }
  .vertical-text {
    writing-mode: vertical-rl;
    text-orientation: mixed;
  }
`;

// Add styles to document
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}
