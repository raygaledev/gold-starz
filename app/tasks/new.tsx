import { useState } from 'react';
import { StyleSheet, TextInput, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useRouter } from 'expo-router';
import { useTasks } from '../../context/TaskContext';
import { z } from 'zod';

type Category = 'Daily' | 'Weekly' | 'Special';

interface NewTaskForm {
  title: string;
  description: string;
  stars: string;
  category: Category;
}

interface FormErrors {
  title?: string;
  description?: string;
  stars?: string;
}

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  stars: z
    .string()
    .min(1, 'Stars are required')
    .regex(/^\d+$/, 'Stars must be a number')
    .transform(val => parseInt(val, 10))
    .refine(
      val => val >= 1 && val <= 9999999,
      'Stars must be between 1 and 9999999',
    ),
  category: z.enum(['Daily', 'Weekly', 'Special']),
});

export default function NewTaskScreen() {
  const router = useRouter();
  const { addTask } = useTasks();
  const [errors, setErrors] = useState<FormErrors>({});

  const [task, setTask] = useState<NewTaskForm>({
    title: '',
    description: '',
    stars: '',
    category: 'Daily',
  });

  const handleSubmit = async () => {
    try {
      const validatedTask = taskSchema.parse(task);

      addTask({
        title: validatedTask.title,
        description: validatedTask.description,
        stars: validatedTask.stars,
        category: validatedTask.category,
      });

      router.back();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: FormErrors = {};
        error.errors.forEach(err => {
          const field = err.path[0] as keyof FormErrors;
          newErrors[field] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Add New Task',
          headerLeft: () => (
            <ThemedText onPress={() => router.back()}>Cancel</ThemedText>
          ),
          headerRight: () => (
            <ThemedText onPress={handleSubmit} style={styles.saveButton}>
              Save
            </ThemedText>
          ),
        }}
      />

      <ThemedView style={styles.form}>
        <ThemedView style={styles.formField}>
          <ThemedText style={styles.label}>Task Title</ThemedText>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            value={task.title}
            onChangeText={text => {
              setTask({ ...task, title: text });
              setErrors({ ...errors, title: undefined });
            }}
            placeholder='Enter task title'
            maxLength={34}
          />
          {errors.title && (
            <ThemedText style={styles.errorText}>{errors.title}</ThemedText>
          )}
        </ThemedView>

        <ThemedView style={styles.formField}>
          <ThemedText style={styles.label}>Description</ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.description && styles.inputError,
            ]}
            value={task.description}
            onChangeText={text => {
              setTask({ ...task, description: text });
              setErrors({ ...errors, description: undefined });
            }}
            placeholder='Enter task description'
            multiline
            numberOfLines={3}
            maxLength={140}
          />
          {errors.description && (
            <ThemedText style={styles.errorText}>
              {errors.description}
            </ThemedText>
          )}
        </ThemedView>

        <ThemedView style={styles.formField}>
          <ThemedText style={styles.label}>Stars</ThemedText>
          <TextInput
            style={[styles.input, errors.stars && styles.inputError]}
            value={task.stars}
            onChangeText={text => {
              const numericText = text.replace(/[^0-9]/g, '');
              setTask({ ...task, stars: numericText });
              setErrors({ ...errors, stars: undefined });
            }}
            placeholder='Enter star value'
            keyboardType='numeric'
            maxLength={7}
          />
          {errors.stars && (
            <ThemedText style={styles.errorText}>{errors.stars}</ThemedText>
          )}
        </ThemedView>

        <ThemedView style={styles.formField}>
          <ThemedText style={styles.label}>Category</ThemedText>
          <ThemedView style={styles.categoryButtons}>
            {(['Daily', 'Weekly', 'Special'] as Category[]).map(category => (
              <Pressable
                key={category}
                style={[
                  styles.categoryButton,
                  task.category === category && styles.categoryButtonActive,
                ]}
                onPress={() => setTask({ ...task, category })}
              >
                <ThemedText
                  style={[
                    styles.categoryButtonText,
                    task.category === category &&
                      styles.categoryButtonTextActive,
                  ]}
                >
                  {category}
                </ThemedText>
              </Pressable>
            ))}
          </ThemedView>
        </ThemedView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  form: {
    gap: 20,
  },
  formField: {
    gap: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  categoryButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  categoryButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: 'white',
  },
});
