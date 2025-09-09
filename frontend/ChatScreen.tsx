import React, { useState, useRef } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import axios from "axios";

// Define a type for each message
type Message = {
  id: string;
  text: string;
  sender: "user" | "ai";
};

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]); // <-- Add type here
  const [input, setInput] = useState("");
  const flatListRef = useRef<FlatList<Message>>(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]); // Works now
    setInput("");

    try {
      const res = await axios.post("http://192.168.1.20:5000/chat", { message: input });
      const aiMessage: Message = { id: Date.now().toString(), text: res.data.reply, sender: "ai" };
      setMessages(prev => [...prev, aiMessage]); // Works now
    } catch (error) {
      const errorMessage: Message = { id: Date.now().toString(), text: "Error connecting to server", sender: "ai" };
      setMessages(prev => [...prev, errorMessage]);
      console.error(error);
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.sender === "user" ? styles.userMessage : styles.aiMessage]}>
      <Text style={item.sender === "user" ? styles.userText : styles.aiText}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 10 }}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
        />
        <TouchableOpacity style={styles.button} onPress={sendMessage}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  messageContainer: { padding: 10, marginVertical: 5, borderRadius: 15, maxWidth: "80%" },
  userMessage: { alignSelf: "flex-end", backgroundColor: "#4f46e5" },
  aiMessage: { alignSelf: "flex-start", backgroundColor: "#e5e7eb" },
  userText: { color: "#fff" },
  aiText: { color: "#000" },
  inputContainer: { flexDirection: "row", padding: 10, borderTopWidth: 1, borderColor: "#ccc", backgroundColor: "#fff" },
  input: { flex: 1, borderWidth: 1, borderColor: "#ccc", borderRadius: 25, paddingHorizontal: 15 },
  button: { marginLeft: 10, backgroundColor: "#4f46e5", borderRadius: 25, paddingHorizontal: 20, justifyContent: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" }
});
