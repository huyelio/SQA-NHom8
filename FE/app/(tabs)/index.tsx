import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View } from "react-native";
import styles from "@/styles/imageDiagnosis/styles";
import UploadSection from "@/components/appComponents/imageDiagnosis/UploadSection";
import ResultSection from "@/components/appComponents/imageDiagnosis/ResultSection";

export default function ImageDiagnosisScreen() {
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [data, setData] = useState<any>(null);

  // --- Render Màn hình ---
  return (
    <LinearGradient
      colors={["#0D0D0D", "#111122", "#0F1125"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0.5, y: 1 }}
      style={styles.container}
    >
      <View
        style={{
          position: "absolute",
          top: -40,
          right: 40,
          width: 320,
          height: 320,
          borderRadius: 320,
          backgroundColor: "#8B5CF6",
          opacity: 0.18,
        }}
      />

      <View
        style={{
          position: "absolute",
          bottom: -80,
          right: 50,
          width: 300,
          height: 300,
          borderRadius: 300,
          backgroundColor: "#06B6D4",
          opacity: 0.08,
        }}
      />
      {data ? (
        <ResultSection
          data={data}
          setData={setData}
          setSelectedImage={setSelectedImage}
        />
      ) : (
        <UploadSection
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          setData={setData}
        />
      )}
    </LinearGradient>
  );
}
