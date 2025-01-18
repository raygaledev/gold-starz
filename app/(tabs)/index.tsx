import { StyleSheet, Pressable, ScrollView } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link, useRouter } from 'expo-router';
import { useRewards } from '../../context/RewardContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const router = useRouter();
  const { rewards } = useRewards();
  const insets = useSafeAreaInsets();
  const starBalance = 34;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <ThemedView style={styles.balanceSection}>
          <ThemedText type='defaultSemiBold' style={styles.balanceLabel}>
            Your Star Balance
          </ThemedText>
          <ThemedText style={styles.starBalance}>{starBalance}★</ThemedText>
        </ThemedView>

        <ThemedView style={styles.rewardsSection}>
          <ThemedView style={styles.rewardsHeaderContainer}>
            <ThemedText type='subtitle' style={styles.rewardsHeaderText}>
              Rewards you can get with Stars
            </ThemedText>
            <Link href='/rewards/new' asChild>
              <Pressable style={styles.addButtonContainer}>
                <ThemedText style={styles.addButton}>+ Add Reward</ThemedText>
              </Pressable>
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
            <ThemedView style={styles.rewardsList}>
              {rewards.map(reward => (
                <Pressable
                  key={reward.id}
                  onPress={() => router.push(`/rewards/new?id=${reward.id}`)}
                  style={({ pressed }) => [
                    styles.rewardPressable,
                    pressed && styles.rewardPressed,
                  ]}
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
                        style={({ pressed }) => [
                          styles.redeemButton,
                          pressed && styles.redeemPressed,
                        ]}
                      >
                        <ThemedText style={styles.redeemText}>
                          Redeem
                        </ThemedText>
                      </Pressable>
                    )}
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
    paddingTop: 0,
  },
  balanceSection: {
    alignItems: 'center',
    paddingTop: 32,
    paddingBottom: 32,
    borderRadius: 12,
    backgroundColor: '#F7F7F7',
    marginBottom: 24,
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666666',
  },
  starBalance: {
    fontSize: 48,
    fontWeight: '800',
    marginTop: 12,
    color: '#00704A',
    height: 60,
    lineHeight: 60,
  },
  rewardsSection: {
    flex: 1,
  },
  rewardsHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingRight: 8,
    flexWrap: 'wrap',
  },
  rewardsHeaderText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  addButtonContainer: {
    padding: 8,
  },
  addButton: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  rewardsList: {
    gap: 12,
  },
  rewardPressable: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  rewardPressed: {
    opacity: 0.7,
  },
  rewardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F7F7F7',
    opacity: 0.6,
  },
  rewardItemAvailable: {
    opacity: 1,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rewardStars: {
    width: 50,
    marginRight: 12,
  },
  rewardStarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00704A',
  },
  rewardDescription: {
    flex: 1,
    fontSize: 16,
    color: '#1A1A1A',
  },
  redeemButton: {
    backgroundColor: '#00704A',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 8,
  },
  redeemPressed: {
    backgroundColor: '#005538',
  },
  redeemText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
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
  },
});
