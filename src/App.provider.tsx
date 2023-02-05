import React from 'react';
import { createContext } from 'react';
import { MoodOptionType, MoodOptionWithTimestamp } from './types';

interface Props {
  children: React.ReactNode;
}

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  handleSelectMood: (mood: MoodOptionType) => void;
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  handleSelectMood: () => {},
});

//React >= 18 removed children from the FC type. If you want it back you need to add it to the props yourself.
export const AppProvider: React.FC<Props> = ({ children }) => {
  const [moodList, setMoodList] = React.useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = React.useCallback((mood: MoodOptionType) => {
    setMoodList(current => [...current, { mood, timestamp: Date.now() }]);
  }, []);
  return (
    <AppContext.Provider value={{ moodList, handleSelectMood }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
