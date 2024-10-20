import mongoos from "mongoos";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    history: [
      {
        role: {
          type: String,
          enum: ["user" || "model"],
          required: true,
        },
        parts: [
          {
            text: {
              type: String,
              required: true,
            },
          },
        ],
        img: {
          typeof: "string",
          required: false,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoos.model.chat || mongoos.model("chat", chatSchema);
