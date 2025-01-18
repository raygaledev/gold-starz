import { useState, useEffect } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { useRewards } from '../../context/RewardContext';
import { z } from 'zod';

interface NewRewardForm {
  description: string;
  stars: string;
}

interface FormErrors {
  description?: string;
  stars?: string;
}

const rewardSchema = z.object({
  description: z.string().min(1, 'Description is required'),
  stars: z
    .string()
    .min(1, 'Stars are required')
    .regex(/^\d+$/, 'Stars must be a number')
    .transform(val => parseInt(val, 10))
    .refine(
      val => val >= 1 && val <= 9999999,
      'Stars must be between 1 and 9999999',
    ),
});

export default function NewRewardScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { addReward, editReward, deleteReward, rewards } = useRewards();
  const [errors, setErrors] = useState<FormErrors>({});

  const [reward, setReward] = useState<NewRewardForm>({
    description: '',
    stars: '',
  });

  useEffect(() => {
    if (id) {
      const existingReward = rewards.find(r => r.id === parseInt(id, 10));
      if (existingReward) {
        setReward({
          description: existingReward.description,
          stars: existingReward.stars.toString(),
        });
      }
    }
  }, [id, rewards]);

  const handleSubmit = () => {
    try {
      const validatedReward = rewardSchema.parse(reward);

      if (id) {
        editReward(parseInt(id, 10), {
          description: validatedReward.description,
          stars: validatedReward.stars,
        });
      } else {
        addReward({
          description: validatedReward.description,
          stars: validatedReward.stars,
        });
      }

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

  const handleDelete = () => {
    if (!id) return;

    deleteReward(parseInt(id, 10));
    router.back();
  };

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: id ? 'Edit Reward' : 'Add New Reward',
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
          <ThemedText style={styles.label}>Description</ThemedText>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
              errors.description && styles.inputError,
            ]}
            value={reward.description}
            onChangeText={text => {
              setReward({ ...reward, description: text });
              setErrors({ ...errors, description: undefined });
            }}
            placeholder='Enter reward description'
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
          <ThemedText style={styles.label}>Stars Required</ThemedText>
          <TextInput
            style={[styles.input, errors.stars && styles.inputError]}
            value={reward.stars}
            onChangeText={text => {
              const numericText = text.replace(/[^0-9]/g, '');
              setReward({ ...reward, stars: numericText });
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
      </ThemedView>

      {id && (
        <ThemedText onPress={handleDelete} style={styles.deleteButton}>
          Delete Reward
        </ThemedText>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  headerButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  deleteButton: {
    color: '#FF3B30',
    textAlign: 'center',
    paddingVertical: 12,
    marginTop: 20,
  },
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
});
