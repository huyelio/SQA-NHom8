import { Text, View, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { runOnJS } from "react-native-worklets";

const THUMB_SIZE = 44;
const SWIPE_THRESHOLD_RATIO = 0.6; // 60% chiều rộng

export function SwipeConfirm({
  onConfirm,
  isLoading = false,
}: {
  onConfirm: () => void;
  isLoading?: boolean;
}) {
  const translateX = useSharedValue(0);
  const trackWidth = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .enabled(!isLoading)
    .onUpdate((e) => {
      translateX.value = Math.max(
        0,
        Math.min(e.translationX, trackWidth.value - THUMB_SIZE)
      );
    })
    .onEnd(() => {
      const threshold = trackWidth.value * SWIPE_THRESHOLD_RATIO;

      if (translateX.value > threshold) {
        translateX.value = withSpring(trackWidth.value - THUMB_SIZE);
        runOnJS(onConfirm)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View
        onLayout={(e) => {
          trackWidth.value = e.nativeEvent.layout.width;
        }}
        style={{
          marginTop: 12,
          height: 44,
          borderRadius: 22,
          backgroundColor: "#052E16",
          justifyContent: "center",
          overflow: "hidden",
          opacity: isLoading ? 0.8 : 1,
        }}
      >
        {!isLoading && (
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              color: "#4ADE80",
              fontSize: 13,
            }}
          >
            Vuốt để xác nhận đã uống
          </Text>
        )}

        {isLoading && (
          <Text
            style={{
              position: "absolute",
              alignSelf: "center",
              color: "#A7F3D0",
              fontSize: 13,
            }}
          >
            Đang ghi nhận...
          </Text>
        )}

        <Animated.View
          style={[
            {
              width: THUMB_SIZE,
              height: THUMB_SIZE,
              borderRadius: THUMB_SIZE / 2,
              backgroundColor: "#22C55E",
              justifyContent: "center",
              alignItems: "center",
            },
            thumbStyle,
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Ionicons name="chevron-forward" size={22} color="#fff" />
          )}
        </Animated.View>
      </View>
    </GestureDetector>
  );
}
