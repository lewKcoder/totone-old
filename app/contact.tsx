import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function ContactScreen() {
  const router = useRouter();

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
    <View style={styles.container}>
      <Text style={styles.title}>お問い合わせ</Text>

      <Text style={styles.label}>お名前</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
        placeholder="山田 太郎"
      />

      <Text style={styles.label}>メールアドレス</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="example@example.com"
        keyboardType="email-address"
      />

      <Text style={styles.label}>お問い合わせ内容</Text>
      <TextInput
        style={[styles.input, { height: 100 }]}
        value={message}
        onChangeText={(text) => setMessage(text)}
        placeholder="お問い合わせ内容を入力してください"
        multiline
      />

      <Button title="送信" onPress={handleSend} />

      {/* 戻るボタン */}
      <View style={{ marginTop: 20 }}>
        <Button title="戻る" onPress={() => router.back()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
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
    borderColor: "#ccc",
    padding: 8,
    fontSize: 14,
    borderRadius: 4,
  },
});
