import React, { useState } from "react";
import { TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useThemeColor } from "@/hooks/useThemeColor";

export default function ContactScreen() {
  const router = useRouter();
  const textColor = useThemeColor("text");
  const borderColor = useThemeColor("tabIconDefault");

  // フォーム入力のステート
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // 送信ボタンが押されたときの処理
  const handleSend = () => {
    // バリデーションやAPI送信など行う例
    console.log("問い合わせ内容:", { name, email, message });

    // 実際にはfetchでサーバーに送るなどの処理を行う。
    // ...
    alert("送信が完了しました。ありがとうございます。");

    // フォームを初期化
    setName("");
    setEmail("");
    setMessage("");
    // 画面を閉じる・戻るなどの処理をしたければ適宜
    // router.back();
  };

  return (
    <ThemedView useAppBackground style={styles.container}>
      <ThemedText style={styles.title}>お問い合わせ</ThemedText>

      <ThemedText style={styles.label}>お名前</ThemedText>
      <TextInput
        style={[styles.input, { borderColor, color: textColor }]}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="山田 太郎"
        placeholderTextColor={borderColor}
      />

      <ThemedText style={styles.label}>メールアドレス</ThemedText>
      <TextInput
        style={[styles.input, { borderColor, color: textColor }]}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="example@example.com"
        keyboardType="email-address"
        placeholderTextColor={borderColor}
      />

      <ThemedText style={styles.label}>お問い合わせ内容</ThemedText>
      <TextInput
        style={[styles.input, { height: 100, borderColor, color: textColor }]}
        value={message}
        onChangeText={(text) => setMessage(text)}
        placeholder="お問い合わせ内容を入力してください"
        multiline
        placeholderTextColor={borderColor}
      />

      <Button title="送信" onPress={handleSend} />

      <ThemedView style={{ marginTop: 20 }}>
        <Button title="戻る" onPress={() => router.back()} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    padding: 8,
    fontSize: 14,
    borderRadius: 4,
  },
});
