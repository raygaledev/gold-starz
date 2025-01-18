import { Stack } from 'expo-router';
import { TaskProvider } from '../context/TaskContext';
import { RewardProvider } from '../context/RewardContext';

export default function RootLayout() {
  return (
    <TaskProvider>
      <RewardProvider>
        <Stack>
          <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
        </Stack>
      </RewardProvider>
    </TaskProvider>
  );
}
