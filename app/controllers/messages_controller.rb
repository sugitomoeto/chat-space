class MessagesController < ApplicationController
  before_action :set_group

  def index # チャットの表示
    @message = Message.new
    @messages = @group.messages.includes(:user)
  end

  def create # チャットの保存
    @message = @group.messages.new(message_params)
    # if @message.save
    #   redirect_to group_messages_path(@group), notice: 'メッセージが表示されました。'
    # else
    #   @messages = @group.messages.includes(:user)
    #   flash.now[:alert] = 'メッセージを入力してください。'
    #   render :index
    # end
    if @message.save
      respond_to do |format|
        format.html{ redirect_to group_messages_path(@group) }
        format.json
      end
    else
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private
  def set_group
    @group = Group.find(params[:group_id])
  end

  def message_params
    params.require(:message).permit(:content, :image).merge(user_id: current_user.id)
  end
end
