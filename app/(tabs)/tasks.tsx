import { StyleSheet, ScrollView, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { useTasks } from '../../context/TaskContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TasksScreen() {
  const { tasks } = useTasks();
  const insets = useSafeAreaInsets();

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + 16 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.headerSection}>
          <ThemedView style={styles.headerRow}>
            <ThemedView>
              <ThemedText type='subtitle' style={styles.headerTitle}>
                Available Tasks
              </ThemedText>
              <ThemedText style={styles.headerSubtitle}>
                Complete tasks to earn stars!
              </ThemedText>
            </ThemedView>
            <Link href='/tasks/new' asChild>
              <Pressable
                style={({ pressed }) => [
                  styles.addButtonContainer,
                  pressed && styles.addButtonPressed,
                ]}
              >
                <ThemedText style={styles.addButton}>+ Add Task</ThemedText>
              </Pressable>
            </Link>
          </ThemedView>
        </ThemedView>

        <ThemedView style={styles.tasksSection}>
          {tasks.length === 0 ? (
            <ThemedView style={styles.emptyState}>
              <ThemedText style={styles.emptyStateTitle}>
                No tasks yet!
              </ThemedText>
              <ThemedText style={styles.emptyStateText}>
                Get started by adding your first task using the + Add Task
                button above.
              </ThemedText>
            </ThemedView>
          ) : (
            <ThemedView style={styles.tasksList}>
              {tasks.map(task => (
                <Pressable
                  key={task.id}
                  style={({ pressed }) => [
                    styles.taskItem,
                    pressed && styles.taskPressed,
                  ]}
                >
                  <ThemedView style={styles.taskHeader}>
                    <ThemedText type='defaultSemiBold' style={styles.taskTitle}>
                      {task.title}
                    </ThemedText>
                    <ThemedView style={styles.starBadge}>
                      <ThemedText style={styles.starText}>
                        {task.stars}★
                      </ThemedText>
                    </ThemedView>
                  </ThemedView>

                  <ThemedText style={styles.taskDescription}>
                    {task.description}
                  </ThemedText>

                  <ThemedView style={styles.categoryBadge}>
                    <ThemedText style={styles.categoryText}>
                      {task.category}
                    </ThemedText>
                  </ThemedView>
                </Pressable>
              ))}
            </ThemedView>
          )}
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  headerSection: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666666',
  },
  addButtonContainer: {
    padding: 8,
  },
  addButtonPressed: {
    opacity: 0.7,
  },
  addButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  tasksSection: {
    flex: 1,
  },
  tasksList: {
    gap: 12,
  },
  taskItem: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskPressed: {
    opacity: 0.7,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
  },
  taskTitle: {
    fontSize: 16,
    flex: 1,
    color: '#1A1A1A',
  },
  starBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  starText: {
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  taskDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
  },
  categoryText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    marginTop: 12,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1A1A1A',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 20,
  },
});
