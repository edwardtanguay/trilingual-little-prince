/* eslint-disable @typescript-eslint/no-explicit-any */
interface IProps {
	obj: any;
}
export const DevDisplayObject = ({ obj }: IProps) => {
	return <pre className="text-xs bg-black text-orange-500 p-3 overflow-scroll" style={{height: '500px'}}>{JSON.stringify(obj, null, 2)}</pre>;
};
