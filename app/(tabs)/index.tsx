import { StyleSheet, Pressable } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter } from 'expo-router';
import { useRewards } from '../../context/RewardContext';

export default function HomeScreen() {
  const router = useRouter();
  const { rewards } = useRewards();
  const starBalance = 34; // Manage this in a context too

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.balanceSection}>
        <ThemedText type='defaultSemiBold'>Your Star Balance:</ThemedText>
        <ThemedText style={styles.starBalance}>{starBalance}★</ThemedText>
      </ThemedView>

      <ThemedView style={styles.rewardsSection}>
        <ThemedView style={styles.rewardsHeaderContainer}>
          <ThemedText type='subtitle' style={styles.rewardsHeaderText}>
            Rewards you can get with Stars
          </ThemedText>
          <Link href='/rewards/new' asChild>
            <ThemedText style={styles.addButton}>+ Add Reward</ThemedText>
          </Link>
        </ThemedView>

        {rewards.length === 0 ? (
          <ThemedView style={styles.emptyState}>
            <ThemedText style={styles.emptyStateTitle}>
              No rewards yet!
            </ThemedText>
            <ThemedText style={styles.emptyStateText}>
              Start by adding some rewards that can be earned with stars.
            </ThemedText>
          </ThemedView>
        ) : (
          rewards.map(reward => (
            <Pressable
              key={reward.id}
              onPress={() => router.push(`/rewards/new?id=${reward.id}`)}
            >
              <ThemedView
                style={[
                  styles.rewardItem,
                  starBalance >= reward.stars && styles.rewardItemAvailable,
                ]}
              >
                <ThemedView style={styles.rewardStars}>
                  <ThemedText style={styles.rewardStarText}>
                    {reward.stars}★
                  </ThemedText>
                </ThemedView>

                <ThemedText style={styles.rewardDescription}>
                  {reward.description}
                </ThemedText>

                {starBalance >= reward.stars && (
                  <Pressable
                    onPress={e => {
                      e.stopPropagation();
                    }}
                    style={styles.redeemButton}
                  >
                    <ThemedText style={styles.redeemText}>Redeem</ThemedText>
                  </Pressable>
                )}
              </ThemedView>
            </Pressable>
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
  balanceSection: {
    alignItems: 'center',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  starBalance: {
    fontSize: 48,
    fontWeight: 'bold',
    marginTop: 8,
  },
  rewardsSection: {
    marginTop: 24,
  },
  rewardsHeaderText: {
    fontSize: 18,
  },
  rewardsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    paddingHorizontal: 16,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    opacity: 0.6,
  },
  rewardItemAvailable: {
    opacity: 1,
  },
  rewardStars: {
    width: 50,
    marginRight: 12,
  },
  rewardStarText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rewardDescription: {
    flex: 1,
    fontSize: 16,
  },
  redeemButton: {
    backgroundColor: '#00704A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  redeemText: {
    color: 'white',
    fontWeight: 'bold',
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
