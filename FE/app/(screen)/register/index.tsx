import { NotifyTypeEnum } from "@/constants/notify";
import { RegisterFromData, RegisterSchema } from "@/schema/RegisterSchema";
import { registerData } from "@/services/api/auth/register";
import { Colors, SafeAreaViewStyles } from "@/styles/Common";
import { notify } from "@/utils/notify";
import { Ionicons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../../styles/register/styles";
import VerifyCodeScreen from "./VerifyCodeScreen";
import { BlobShape } from "@/components/appComponents/BlobShape";
import DatePickerModal from "@/components/appComponents/DatePickerModal";
import { Picker } from "@react-native-picker/picker";
const GENDER_OPTIONS = [
  { label: "Nam", value: "male" },
  { label: "Nữ", value: "female" },
  { label: "Khác", value: "other" },
];

const genderLabel = (value: string | null) => {
  return GENDER_OPTIONS.find((g) => g.value === value)?.label ?? "Chưa chọn";
};
const Register = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleCheckPassword, setIsVisibleCheckPassword] = useState(false);
  const [step, setStep] = useState<number>(1);
  const { control, handleSubmit, getValues } = useForm<RegisterFromData>({
    resolver: zodResolver(RegisterSchema),
    mode: "onBlur",
    defaultValues: {
      password: "",
      email: "",
      name: "",
      checkPassword: "",
      dateOfBirth: undefined,
      gender: undefined,
    },
  });
  const registerMutation = useMutation({
    mutationFn: (payload: any) => registerData(payload),
    onSuccess: (response: any) => {
      notify(response?.message || "Đăng ký thành công", NotifyTypeEnum.SUCCESS);
      setStep(2);
    },
    onError: (error: any) => {
      notify(error.message || "Lỗi kết nối máy chủ", NotifyTypeEnum.ERROR);
    },
  });

  const onSubmit = () => {
    const { checkPassword, ...payload } = getValues();
    const formatted = {
      ...payload,
    };
    registerMutation.mutate(formatted);
  };
  const onInvalid = (errors: any) => {
    const firstError = Object.values(errors)[0] as { message?: string };
    const message =
      firstError?.message || "Vui lòng kiểm tra lại thông tin đăng ký";
    notify(message, NotifyTypeEnum.ERROR);
  };
  return (
    <SafeAreaView
      style={[
        SafeAreaViewStyles.SafeAreaView,
        { backgroundColor: Colors.background },
      ]}
    >
      {step === 1 ? (
        <>
          {/* Decorative blobs */}
          <View style={{ position: "absolute", width: "100%", height: "100%" }}>
            <BlobShape
              height={350}
              width={200}
              rotate="25deg"
              rx={80}
              ry={80}
              top={-40}
              right={280}
              opacity={0.25}
            />
            <BlobShape
              height={400}
              width={200}
              rotate="70deg"
              rx={80}
              ry={120}
              top={520}
              right={300}
              opacity={0.25}
            />
            <BlobShape
              height={400}
              width={200}
              rotate="0deg"
              rx={80}
              ry={120}
              top={190}
              right={-30}
              opacity={0.25}
            />
          </View>

          {/* Header */}
          <View style={styles.headerContainer}>
            <Text style={styles.appTitle}>HealthCare</Text>
            <Text style={styles.subtitle}>
              Chăm sóc sức khỏe - Dễ dàng & Tin cậy
            </Text>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View style={styles.formCard}>
              {/* Email */}
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#8E8E8E"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input]}
                    placeholder="Tên"
                    placeholderTextColor="#8E8E8E"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                control={control}
                name="dateOfBirth"
                render={({ field: { onChange, value } }) => (
                  <DatePickerModal value={value} onChange={onChange} />
                )}
              />

              <Controller
                control={control}
                name="gender"
                render={({ field: { value, onChange } }) => (
                  <View style={styles.selectWrapper}>
                    <Picker
                      selectedValue={value}
                      onValueChange={onChange}
                      style={styles.select}
                    >
                      {GENDER_OPTIONS.map((g) => (
                        <Picker.Item
                          key={g.value}
                          label={g.label}
                          value={g.value}
                        />
                      ))}
                    </Picker>
                  </View>
                )}
              />

              <View style={styles.passwordContainer}>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, { paddingRight: 40 }]}
                      placeholder="Mật khẩu"
                      placeholderTextColor="#8E8E8E"
                      secureTextEntry={!isVisiblePassword}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Pressable
                  style={styles.eyeButton}
                  onPress={() => setIsVisiblePassword(!isVisiblePassword)}
                >
                  <Ionicons
                    name={isVisiblePassword ? "eye-outline" : "eye-off-outline"}
                    size={22}
                    color="#7C7C7C"
                  />
                </Pressable>
              </View>

              <View style={styles.passwordContainer}>
                <Controller
                  control={control}
                  name="checkPassword"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={[styles.input, { paddingRight: 40 }]}
                      placeholder="Nhập lại mật khẩu"
                      placeholderTextColor="#8E8E8E"
                      secureTextEntry={!isVisibleCheckPassword}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                    />
                  )}
                />
                <Pressable
                  style={styles.eyeButton}
                  onPress={() =>
                    setIsVisibleCheckPassword(!isVisibleCheckPassword)
                  }
                >
                  <Ionicons
                    name={
                      isVisibleCheckPassword ? "eye-outline" : "eye-off-outline"
                    }
                    size={22}
                    color="#7C7C7C"
                  />
                </Pressable>
              </View>

              {/* Button */}
              <Pressable
                disabled={registerMutation.isPending}
                style={styles.submitButton}
                onPress={handleSubmit(onSubmit, onInvalid)}
              >
                <Text style={styles.primaryText}>Đăng ký</Text>
              </Pressable>
            </View>
          </ScrollView>
        </>
      ) : (
        <VerifyCodeScreen email={getValues("email")} />
      )}
    </SafeAreaView>
  );
};

export default Register;
