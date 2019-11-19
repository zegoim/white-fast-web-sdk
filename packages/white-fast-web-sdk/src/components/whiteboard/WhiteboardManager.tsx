import * as React from "react";
import {Badge, Tabs, Icon, message} from "antd";
import "./WhiteboardManager.less";
import {Room} from "white-react-sdk";
import {LanguageEnum, RtcType} from "../../pages/NetlessRoom";
import {IdentityType} from "./WhiteboardTopRight";
import {ViewMode} from "white-react-sdk";
import Identicon from "react-identicons";
import {GuestUserType, HostUserType, ClassModeType} from "../../pages/RoomManager";
import speak from "../../assets/image/speak.svg";
import user_empty from "../../assets/image/user_empty.svg";
import raise_hands_active from "../../assets/image/raise_hands_active.svg";
import WhiteboardChat from "./WhiteboardChat";
import {MessageType} from "./WhiteboardBottomRight";
import ClassroomMedia from "./ClassroomMedia";
import {RoomContextConsumer} from "../../pages/RoomContext";
const { TabPane } = Tabs;

export type WhiteboardManagerProps = {
    room: Room;
    userId: string;
    handleManagerState: () => void;
    isManagerOpen: boolean | null;
    isChatOpen: boolean;
    uuid: string;
    hostInfo?: HostUserType,
    cameraState?: ViewMode;
    disableCameraTransform?: boolean;
    identity?: IdentityType;
    userName?: string;
    userAvatarUrl?: string;
    language?: LanguageEnum;
    rtc?: RtcType;
    elementId: string;
};

export type WhiteboardManagerStates = {
    activeKey: string;
    messages: MessageType[];
    seenMessagesLength: number,
    isRtcReady: boolean,
};


export default class WhiteboardManager extends React.Component<WhiteboardManagerProps, WhiteboardManagerStates> {
    public constructor(props: WhiteboardManagerProps) {
        super(props);
        this.state = {
            activeKey: "1",
            messages: [],
            seenMessagesLength: 0,
            isRtcReady: false,
        };
    }


    public componentDidMount(): void {
        this.props.room.addMagixEventListener("message",  (event: any) => {
            this.setState({messages: [...this.state.messages, event.payload]});
        });
    }
    public UNSAFE_componentWillReceiveProps(nextProps: WhiteboardManagerProps): void {
        if (this.props.cameraState !== undefined && this.props.disableCameraTransform !== undefined && nextProps.cameraState !== undefined && nextProps.disableCameraTransform !== undefined) {
           if (this.props.cameraState !== nextProps.cameraState) {
               this.props.room.setViewMode(nextProps.cameraState);
               this.props.room.disableCameraTransform = nextProps.disableCameraTransform;
           }
        }
        if (this.props.isChatOpen !== nextProps.isChatOpen) {
            if (nextProps.isChatOpen) {
                this.setState({activeKey: "1"});
            } else {
                this.setState({activeKey: "2"});
            }
        }
    }

    private renderHost = (): React.ReactNode => {
        const {room, userId} = this.props;
        const hostInfo: HostUserType = room.state.globalState.hostInfo;
        if (hostInfo) {
            if (userId === hostInfo.userId) {
                return (
                    <RoomContextConsumer children={context => (
                        <ClassroomMedia isVideoEnable={hostInfo.isVideoEnable} applyForRtc={false}
                                        startRtcCallback={context.startRtcCallback}
                                        stopRtcCallback={context.stopRtcCallback}
                                        language={this.props.language}
                                        rtc={this.props.rtc} classMode={hostInfo.classMode}
                                        userId={parseInt(this.props.userId)}
                                        handleManagerState={this.props.handleManagerState}
                                        identity={this.props.identity}
                                        room={this.props.room}
                                        channelId={this.props.uuid}/>
                    )}/>
                );
            } else {
                const thisGuestUsers = room.state.globalState.guestUsers;
                if (thisGuestUsers) {
                    const selfInfo: GuestUserType = thisGuestUsers.find((guestUser: GuestUserType) => guestUser.userId === userId);
                    if (selfInfo) {
                        return (
                            <RoomContextConsumer children={context => (
                                <ClassroomMedia isVideoEnable={hostInfo.isVideoEnable}
                                                applyForRtc={selfInfo.applyForRtc}
                                                startRtcCallback={context.startRtcCallback}
                                                stopRtcCallback={context.stopRtcCallback}
                                                language={this.props.language}
                                                rtc={this.props.rtc}
                                                classMode={hostInfo.classMode}
                                                userId={parseInt(this.props.userId)}
                                                handleManagerState={this.props.handleManagerState}
                                                identity={this.props.identity}
                                                room={this.props.room}
                                                channelId={this.props.uuid}/>
                            )}/>
                        );
                    } else {
                        return (
                            <RoomContextConsumer children={context => (
                                <ClassroomMedia isVideoEnable={hostInfo.isVideoEnable}
                                                applyForRtc={false}
                                                startRtcCallback={context.startRtcCallback}
                                                stopRtcCallback={context.stopRtcCallback}
                                                language={this.props.language}
                                                rtc={this.props.rtc}
                                                classMode={hostInfo.classMode}
                                                userId={parseInt(this.props.userId)}
                                                handleManagerState={this.props.handleManagerState}
                                                identity={this.props.identity}
                                                room={this.props.room}
                                                channelId={this.props.uuid}/>
                            )}/>
                        );
                    }
                } else {
                    return (
                        <RoomContextConsumer children={context => (
                            <ClassroomMedia isVideoEnable={hostInfo.isVideoEnable}
                                            applyForRtc={false}
                                            startRtcCallback={context.startRtcCallback}
                                            stopRtcCallback={context.stopRtcCallback}
                                            language={this.props.language}
                                            rtc={this.props.rtc}
                                            classMode={hostInfo.classMode}
                                            userId={parseInt(this.props.userId)}
                                            handleManagerState={this.props.handleManagerState}
                                            identity={this.props.identity}
                                            room={this.props.room}
                                            channelId={this.props.uuid}/>
                        )}/>
                    );
                }
            }
        } else {
            return null;
        }
    }

    private handleAgree = (room: Room, guestUser: GuestUserType, guestUsers: GuestUserType[]): void => {
        const hostInfo: HostUserType = room.state.globalState.hostInfo;
        if (this.props.identity === IdentityType.host) {
            if (hostInfo && guestUsers) {
                if (hostInfo.isVideoEnable) {
                    const users = guestUsers.map((user: GuestUserType) => {
                        if (user.userId === guestUser.userId) {
                            user.isReadOnly = false;
                            user.cameraState = ViewMode.Freedom;
                            user.disableCameraTransform = false;
                            user.applyForRtc = true;
                        }
                        return user;
                    });
                    room.setGlobalState({guestUsers: users});
                } else {
                    const users = guestUsers.map((user: GuestUserType) => {
                        if (user.userId === guestUser.userId) {
                            user.isReadOnly = false;
                            user.cameraState = ViewMode.Freedom;
                            user.disableCameraTransform = false;
                        }
                        return user;
                    });
                    room.setGlobalState({guestUsers: users});
                }
            }
        }
    }

    private handleUnlock = (state: boolean, room: Room, guestUser: GuestUserType, guestUsers: GuestUserType[]): void => {
        const {identity} = this.props;
        if (identity === IdentityType.host && guestUsers) {
            let users;
            if (state) {
                // 解锁
                users = guestUsers.map((user: GuestUserType) => {
                    if (user.userId === guestUser.userId) {
                        user.isReadOnly = false;
                        user.cameraState = ViewMode.Freedom;
                        user.disableCameraTransform = false;
                    }
                    return user;
                });
            } else {
                // 锁定
                users = guestUsers.map((user: GuestUserType) => {
                    if (user.userId === guestUser.userId) {
                        user.isReadOnly = true;
                        user.cameraState = ViewMode.Follower;
                        user.isHandUp = false;
                        user.disableCameraTransform = true;
                        user.applyForRtc = false;
                    }
                    return user;
                });
            }
            room.setGlobalState({guestUsers: users});
        }
    }
    private renderGuestIcon = (guestUser: GuestUserType, guestUsers: GuestUserType[]): React.ReactNode => {
        const {room} = this.props;
        const hostInfo: HostUserType = room.state.globalState.hostInfo;
        const isHost = this.props.identity === IdentityType.host;
        if (hostInfo && hostInfo.classMode === ClassModeType.handUp) {
            if (guestUser.isHandUp) {
                if (guestUser.isReadOnly) {
                    return (
                        <div className="room-member-icon-box">
                            <div onClick={() => this.handleAgree(room, guestUser, guestUsers)} className={isHost ? "room-member-cell-icon" : "room-member-cell-icon-disable"}>
                                <img src={raise_hands_active}/>
                            </div>
                            <div onClick={() => this.handleUnlock(true, room, guestUser, guestUsers)} className={isHost ? "room-member-cell-icon" : "room-member-cell-icon-disable"}>
                                <Icon type="lock" />
                            </div>
                        </div>
                    );
                } else {
                    return (
                        <div className="room-member-icon-box">
                            <div className={isHost ? "room-member-cell-icon" : "room-member-cell-icon-disable"}>
                                <img style={{width: 14}} src={speak}/>
                            </div>
                            <div onClick={() => this.handleUnlock(false, room, guestUser, guestUsers)}
                                 className={isHost ? "room-member-cell-icon" : "room-member-cell-icon-disable"}>
                                <Icon type="unlock" />
                            </div>
                        </div>
                    );
                }
            } else {
                if (!guestUser.isReadOnly) {
                    return <div onClick={() => this.handleUnlock(false, room, guestUser, guestUsers)}
                                className={isHost ? "room-member-cell-icon" : "room-member-cell-icon-disable"}>
                        <Icon type="unlock" />
                    </div>;
                } else {
                    return <div onClick={() => this.handleUnlock(true, room, guestUser, guestUsers)}
                                className={isHost ? "room-member-cell-icon" : "room-member-cell-icon-disable"}>
                        <Icon type="lock" />
                    </div>;
                }
            }
        } else {
            if (!guestUser.isReadOnly) {
                return <div onClick={() => this.handleUnlock(false, room, guestUser, guestUsers)}
                            className={isHost ? "room-member-cell-icon" : "room-member-cell-icon-disable"}>
                    <Icon type="unlock" />
                </div>;
            } else {
                return <div onClick={() => this.handleUnlock(true, room, guestUser, guestUsers)}
                            className={isHost ? "room-member-cell-icon" : "room-member-cell-icon-disable"}>
                    <Icon type="lock" />
                </div>;
            }
        }
    }
    private renderGuest = (): React.ReactNode => {
        const {room, language} = this.props;
        const isEnglish = language === LanguageEnum.English;
        const globalGuestUsers: GuestUserType[] = room.state.globalState.guestUsers;

        if (globalGuestUsers) {
            const guestNodes = globalGuestUsers.map((guestUser: GuestUserType, index: number) => {
                return (
                    <div className="room-member-cell" key={`${index}`}>
                        <div className="room-member-cell-inner">
                            {guestUser.avatar ?
                                <div className="manager-avatar-box">
                                    <img className="room-member-avatar"  src={guestUser.avatar}/>
                                </div>
                                :
                                <div className="manager-avatar-box">
                                    <Identicon
                                        className={`avatar-${guestUser.userId}`}
                                        size={24}
                                        string={guestUser.userId}/>
                                </div>
                            }
                            <div className="control-box-name">{guestUser.name}</div>
                        </div>
                        {this.renderGuestIcon(guestUser, globalGuestUsers)}
                    </div>
                );
            });
            return (
                <div>
                    {guestNodes}
                </div>
            );
        } else {
            return <div className="room-member-empty">
                <img src={user_empty}/>
                <div>{isEnglish ? "No students have joined" : "尚且无学生加入"}</div>
            </div>;
        }
    }

    private handleDotState = (): boolean => {
        const isActive = this.state.activeKey === "2";
        if (this.props.isManagerOpen && !isActive) {
            const guestUsers: GuestUserType[] = this.props.room.state.globalState.guestUsers;
            if (guestUsers && guestUsers.length > 0) {
                const handUpGuestUsers = guestUsers.filter((guestUser: GuestUserType) => guestUser.isHandUp);
                return handUpGuestUsers && handUpGuestUsers.length > 0;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    private renderUserListTitle = (): React.ReactNode => {
        const {language} = this.props;
        const isEnglish = language === LanguageEnum.English;
        if (this.props.identity === IdentityType.host) {
            return (
                <Badge dot={this.handleDotState()} overflowCount={99} offset={[8, -2]}>
                    <div>{isEnglish ? "Users List" : "用户列表"}</div>
                </Badge>
            );
        } else {
            return (
                <div>{isEnglish ? "Users List" : "用户列表"}</div>
            );
        }
    }

    private renderChatListTitle = (): React.ReactNode => {
        const {language} = this.props;
        const isEnglish = language === LanguageEnum.English;
        const isActive = this.state.activeKey === "1";
        return (
            <Badge overflowCount={99} offset={[8, -2]} count={isActive ? 0 : (this.state.messages.length - this.state.seenMessagesLength)}>
                <div>{isEnglish ? "Live Chat" : "聊天群组"}</div>
            </Badge>
        );
    }

    private handleTabsChange = (evt: any): void => {
        this.setState({activeKey: evt, seenMessagesLength: this.state.messages.length});
    }

    private handleManagerStyle = (): string => {
        if (this.props.isManagerOpen) {
            return "manager-box";
        } else {
            return "manager-box-mask-close";
        }
    }
    public render(): React.ReactNode {
        if (this.props.isManagerOpen === null) {
            return null;
        } else {
            return (
                <div className={this.handleManagerStyle()}>
                    {this.renderHost()}
                    <div className="chat-box-switch">
                        <Tabs activeKey={this.state.activeKey} onChange={this.handleTabsChange}>
                            <TabPane tab={this.renderChatListTitle()} key="1">
                                <WhiteboardChat
                                    elementId={this.props.elementId}
                                    identity={this.props.identity}
                                    language={this.props.language}
                                    messages={this.state.messages}
                                    userAvatarUrl={this.props.userAvatarUrl}
                                    userId={this.props.userId}
                                    userName={this.props.userName}
                                    room={this.props.room}/>
                            </TabPane>
                            <TabPane tab={this.renderUserListTitle()} key="2">
                                <div className="guest-box">
                                    {this.renderGuest()}
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </div>
            );
        }
    }
}
