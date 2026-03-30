
import { AddReminderMedicationForm } from "@/schema/medicationSchema";
import { Colors } from "@/styles/Common";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { UseFormSetValue, useWatch } from "react-hook-form";
import { Modal, Pressable, Text, View } from "react-native";
import styles from "./styles";
import { WEEK_DAYS, WEEK_DAYS_OPTIONS, WEEK_ORDER } from "@/constants/medication";

type Props = {
  showWeekModal: boolean;
  setShowWeekModal: (value: boolean) => void;
  setValue: UseFormSetValue<AddReminderMedicationForm>;
  control: any;
};

const CheckBoxDaysModal = ({
  showWeekModal,
  setShowWeekModal,
  setValue,
  control,
}: Props) => {
  const [tempDays, setTempDays] = useState<WEEK_DAYS[]>([]);
  const daysOfWeek = useWatch({
    control,
    name: "days_of_week",
  });

  useEffect(() => {
    if (showWeekModal) {
      setTempDays(daysOfWeek);
    }
  }, [showWeekModal]);

  const commitSelection = () => {
    setValue("days_of_week", tempDays, {
      shouldDirty: true,
      shouldValidate: true,
    });
    if (tempDays.length === 7) {
      setValue("days_of_week", [], {
        shouldDirty: true,
        shouldValidate: true,
      });
      setValue("frequency_type", "DAILY", {
        shouldDirty: true,
        shouldValidate: true,
      });
    }

    setShowWeekModal(false);
  };

  return (
    <Modal visible={showWeekModal} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          {WEEK_DAYS_OPTIONS.map((d) => {
            const selected = tempDays.includes(d.value);

            const handlePress = () => {
              let newValue = selected
                ? tempDays.filter((x) => x !== d.value)
                : [...tempDays, d.value];

              newValue = newValue.sort(
                (a, b) => WEEK_ORDER.indexOf(a) - WEEK_ORDER.indexOf(b)
              );

              setTempDays(newValue);
            };

            return (
              <Pressable
                key={d.value}
                onPress={handlePress}
                style={[styles.modalItem, selected && styles.modalItemSelected]}
              >
                <Text style={{ color: "#FFF" }}>{d.label}</Text>
              </Pressable>
            );
          })}

          <Pressable onPress={commitSelection}>
            <LinearGradient
              colors={[Colors.primary, Colors.primary_2]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.modalCloseButton}
            >
              <Text style={{ color: "#FFF", textAlign: "center" }}>Xong</Text>
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default CheckBoxDaysModal;
