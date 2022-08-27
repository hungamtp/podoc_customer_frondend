export interface ILoadingPromptProps {}

export default function LoadingPrompt(props: ILoadingPromptProps) {
  return (
    <div>
      <div id="preloader">
        <div id="status">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
