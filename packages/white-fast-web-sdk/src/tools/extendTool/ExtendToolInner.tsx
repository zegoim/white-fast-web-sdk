import * as React from "react";
import uuidv4 from "uuid/v4";
import "./ExtendToolInner.less";
import {
    Room,
    PluginComponentClass,
} from "white-react-sdk";
import {Button, Input, Modal, Tabs, Tooltip} from "antd";
import web_plugin from "../../assets/image/web_plugin.svg";
import editor_plugin from "../../assets/image/editor_plugin.svg";
import video_plugin from "../../assets/image/video_plugin.svg";
import audio_plugin from "../../assets/image/audio_plugin.svg";
import {LanguageEnum} from "../../pages/NetlessRoom";
const { TabPane } = Tabs;
export type ExtendToolInnerProps = {
    whiteboardLayerDownRef: HTMLDivElement;
    room: Room;
    language?: LanguageEnum;
    userId: string;
    plugins?: PluginComponentClass | ReadonlyArray<PluginComponentClass>;
};

enum ExtendToolType {
    plugin = "plugin",
    geometry = "geometry",
    subject = "subject",
}

export type ExtendToolInnerStates = {
    activeKey: string;
    isInputH5Visible: boolean;
};

export default class ExtendToolInner extends React.Component<ExtendToolInnerProps, ExtendToolInnerStates> {
    public constructor(props: ExtendToolInnerProps) {
        super(props);
        this.state = {
            activeKey: "1",
            isInputH5Visible: false,
        };
    }

    private addImage = (url: string): void => {
        const {clientWidth, clientHeight} = this.props.whiteboardLayerDownRef;
        const {x, y} = this.props.room.convertToPointInWorld({x: clientWidth / 2, y: clientHeight / 2});
        const uuid = uuidv4();
        this.props.room.insertImage({
            uuid: uuid,
            centerX: x,
            centerY: y,
            width: 180,
            height: 180,
        });
        this.props.room.completeImageUpload(uuid, url);
        this.props.room.setMemberState({
            currentApplianceName: "selector",
        });
    }

    private handleTabsChange = (evt: any): void => {
        if (evt === "1") {
            this.setState({activeKey: evt});
        } else {
            this.setState({activeKey: evt});
        }
    }
    private insertPlugin = (protocal: string, width: number, height: number): void => {
        this.props.room.insertPlugin({
            protocal: protocal,
            centerX: 0,
            centerY: 0,
            width: width,
            height: height,
        });
    }
    public render(): React.ReactNode {
        const {language} = this.props;
        const isEnglish = language === LanguageEnum.English;
        return (
            <div className="extend-inner-box">
                <Tabs activeKey={this.state.activeKey} onChange={this.handleTabsChange}>
                    <TabPane tab={isEnglish ? "Plugins" : "插件教具"} key="1">
                        <div className="extend-icon-out-box">
                            <div className="extend-icon-box">
                                <Tooltip placement="bottom" title={isEnglish ? "Web page" : "H5 课件"}>
                                    <div onClick={() => {
                                        this.setState({isInputH5Visible: true});
                                    }} className="extend-inner-icon">
                                        <img src={web_plugin}/>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="extend-icon-box">
                                <Tooltip placement="bottom" title={isEnglish ? "Editor" : "文本编辑器"}>
                                    <div onClick={() => this.insertPlugin("white-editor-plugin", 720, 600)} className="extend-inner-icon">
                                        <img src={editor_plugin}/>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="extend-icon-box">
                                <Tooltip placement="bottom" title={isEnglish ? "Upload video" : "上传视频"}>
                                    <div onClick={() => this.insertPlugin("video", 480, 270)} className="extend-inner-icon">
                                        <img style={{width: 26}} src={video_plugin}/>
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="extend-icon-box">
                                <Tooltip placement="bottom" title={isEnglish ? "Upload video" : "上传音频"}>
                                    <div onClick={() => this.insertPlugin("audio", 480, 270)} className="extend-inner-icon">
                                        <img style={{width: 26}} src={audio_plugin}/>
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </TabPane>
                    <TabPane tab={isEnglish ? "Graph" : "常用图形"} key="2">
                    </TabPane>
                </Tabs>
                <Modal
                    visible={this.state.isInputH5Visible}
                    footer={null}
                    title={isEnglish ? "Exit classroom" : "退出教室"}
                    onCancel={() => this.setState({isInputH5Visible: false})}
                >
                    <div className="whiteboard-share-box">
                        <div className="whiteboard-share-text-box">
                            <Input/>
                            <Button
                                style={{marginTop: 16, width: 240}}
                                size="large">
                                提交 H5 课件地址
                            </Button>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}
