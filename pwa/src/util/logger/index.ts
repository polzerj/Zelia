import Logger from "../../types/Logger";
import ConsoleLogger from "./ConsoleLogger";
import DebugComponentLogger from "./DebugComponentLogger";
import NullDeviceLogger from "./NullDeviceLogger";

export default new ConsoleLogger() as Logger;
