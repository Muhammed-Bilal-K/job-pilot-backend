import NotificationModel from "../frameworks/models/notification.modal";

class NotificationRepository {
  async create(reciever_id: string, user_id: string, message: string) {
    try {
      await NotificationModel.create({ user_id, reciever_id, message });
      return "Created";
    } catch (err) {
      throw err;
    }
  }

  async deleteOne(id: string) {
    await NotificationModel.findByIdAndDelete(id);
  }

  async deleteMany(user_id: string) {
    await NotificationModel.deleteMany({ reciever_id: user_id });
  }

  async getAllNotification(id: string) {
    const notification = await NotificationModel.find({
      reciever_id: id,
    }).populate("user_id");
    return notification;
  }
}

export default NotificationRepository;
