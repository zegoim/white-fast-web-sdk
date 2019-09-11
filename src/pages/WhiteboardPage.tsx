import * as React from "react";
import RealTime, {ToolBarPositionEnum, UserType} from "../components/RealTime";
export type WhiteboardPageProps = {
    uuid: string;
    userId: string;
    roomToken: string;
    userInf: UserType;
    toolBarPosition?: ToolBarPositionEnum;
    boardBackgroundColor?: string;
    isReadOnly?: boolean;
    logoUrl?: string | boolean;
    defaultColorArray?: string[];
    colorArrayStateCallback?: (colorArray: string[]) => void;
};


export default class WhiteboardPage extends React.Component<WhiteboardPageProps, {}> {
    public constructor(props: WhiteboardPageProps) {
        super(props);
    }

    private onColorArrayChange = (colorArray: string[]): void => {
        const {colorArrayStateCallback} = this.props;
        if (colorArrayStateCallback) {
            colorArrayStateCallback(colorArray);
        }
    }

    public render(): React.ReactNode {
        const {
            uuid,
            userInf,
            defaultColorArray,
            logoUrl,
            roomToken,
            boardBackgroundColor,
            toolBarPosition,
            isReadOnly,
        } = this.props;
        return (
            <div>
                <RealTime
                    uuid={uuid}
                    userInf={userInf}
                    roomToken={roomToken}
                    logoUrl={logoUrl}
                    isReadOnly={isReadOnly}
                    toolBarPosition={toolBarPosition}
                    defaultColorArray={defaultColorArray}
                    boardBackgroundColor={boardBackgroundColor}
                    onColorArrayChange={this.onColorArrayChange}/>
            </div>
        );
    }
}
