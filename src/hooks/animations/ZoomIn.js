import { Transition } from "@headlessui/react";

const ZoomIn = (props) => {
  const { show, children } = props;
  return (
    <Transition
      show={show}
      enter="transform transition ease-out duration-200"
      enterFrom="opacity-0 scale-0"
      enterTo="opacity-100 scale-100"
      leave="transform transition ease-out duration-500"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-0"
    >
      {children}
    </Transition>
  );
};

export default ZoomIn;
