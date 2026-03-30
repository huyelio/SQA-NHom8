import { Colors } from "@/styles/Common";
import ImagePickerBox from "../ImagePickerBox";

const AIAnalyzeSection = ({
  foodImage,
  setFoodImage,
}: {
  foodImage?: string;
  setFoodImage: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  return (
    <ImagePickerBox
      imageUri={foodImage}
      setImageUri={setFoodImage}
      style={{
        minHeight: 350,
        width: "100%",
        borderWidth: 4,
        borderColor: Colors.border,
        borderStyle: "dashed",
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.card,
        overflow: "hidden",
        marginBottom: 30,
        maxHeight: "65%",
      }}
      previewStyle={{
        width: "100%",
        borderRadius: 12,
      }}
    />
  );
};

export default AIAnalyzeSection;
