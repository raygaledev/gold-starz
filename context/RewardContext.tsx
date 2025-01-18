import { createContext, useContext, useState, ReactNode } from 'react';

export interface Reward {
  id: number;
  stars: number;
  description: string;
}

interface RewardContextType {
  rewards: Reward[];
  addReward: (reward: Omit<Reward, 'id'>) => void;
  deleteReward: (id: number) => void;
  editReward: (id: number, updatedReward: Omit<Reward, 'id'>) => void;
}

const RewardContext = createContext<RewardContextType | undefined>(undefined);

const initialRewards: Reward[] = [];

const sortRewards = (rewards: Reward[]): Reward[] => {
  return [...rewards].sort((a, b) => a.stars - b.stars);
};

export function RewardProvider({ children }: { children: ReactNode }) {
  const [rewards, setRewards] = useState<Reward[]>(initialRewards);

  const addReward = (newReward: Omit<Reward, 'id'>) => {
    setRewards(currentRewards => {
      const newRewardWithId = {
        ...newReward,
        id: Math.max(...currentRewards.map(r => r.id), 0) + 1,
      };
      return sortRewards([...currentRewards, newRewardWithId]);
    });
  };

  const deleteReward = (id: number) => {
    setRewards(currentRewards =>
      sortRewards(currentRewards.filter(reward => reward.id !== id)),
    );
  };

  const editReward = (id: number, updatedReward: Omit<Reward, 'id'>) => {
    setRewards(currentRewards =>
      sortRewards(
        currentRewards.map(reward =>
          reward.id === id ? { ...updatedReward, id } : reward,
        ),
      ),
    );
  };

  return (
    <RewardContext.Provider
      value={{ rewards, addReward, deleteReward, editReward }}
    >
      {children}
    </RewardContext.Provider>
  );
}

export function useRewards() {
  const context = useContext(RewardContext);
  if (!context) {
    throw new Error('useRewards must be used within a RewardProvider');
  }
  return context;
}
