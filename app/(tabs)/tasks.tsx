import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { useTasks } from '../../context/TaskContext';

export default function TasksScreen() {
  const { tasks } = useTasks();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.headerSection}>
        <ThemedView style={styles.headerRow}>
          <ThemedView>
            <ThemedText type='subtitle'>Available Tasks</ThemedText>
            <ThemedText>Complete tasks to earn stars!</ThemedText>
          </ThemedView>
          <Link href='/tasks/new' asChild>
            <ThemedText style={styles.addButton}>+ Add Task</ThemedText>
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
              Get started by adding your first task using the + Add Task button
              above.
            </ThemedText>
          </ThemedView>
        ) : (
          tasks.map(task => (
            <ThemedView key={task.id} style={styles.taskItem}>
              <ThemedView style={styles.taskHeader}>
                <ThemedText type='defaultSemiBold' style={styles.taskTitle}>
                  {task.title}
                </ThemedText>
                <ThemedView style={styles.starBadge}>
                  <ThemedText style={styles.starText}>{task.stars}★</ThemedText>
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
            </ThemedView>
          ))
        )}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerSection: {
    marginBottom: 24,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    paddingHorizontal: 16,
  },
  tasksSection: {
    gap: 16,
  },
  taskItem: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 8,
    gap: 8,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskTitle: {
    fontSize: 16,
    flex: 1,
  },
  starBadge: {
    backgroundColor: '#FFD700',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  starText: {
    fontWeight: 'bold',
  },
  taskDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 4,
  },
  categoryText: {
    fontSize: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0.03)',
    borderRadius: 8,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    opacity: 0.7,
    textAlign: 'center',
  },
});
