import { Drawer } from '@mui/material';
import styled from 'styled-components';
import { ReactNode } from 'react';
import { Icon } from '@/shared/ui/Icon/Icon';

interface CustomDrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
}

export function SearchFilter({ 
  open, 
  onClose, 
  children,
}: CustomDrawerProps) {
  return (
    <Drawer
          anchor='right'
      open={open}
      onClose={onClose}
    >
      <DrawerContent>
              <DrawerHeader>
                  <HeaderLeftWrap>
            <Icon 
            type="close" 
            size={16}
            onClick={onClose} 
            />
          <DrawerTitle>필터</DrawerTitle>
                  </HeaderLeftWrap>
                  <RightWrap onClick={()=>{console.log("init click")}}>
                      초기화
                  </RightWrap>
        </DrawerHeader>
        {children}
          </DrawerContent>
          
    </Drawer>
  );
}

// Drawer 내부 컨텐츠를 위한 스타일
const DrawerContent = styled.div`
  width: 360px;
  padding: 20px;
`;
const HeaderLeftWrap = styled.div`
    display: flex;
    align-items: center;
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const DrawerTitle = styled.div`
    margin-left: 20px;
    font-size: var(--semi-bold--md-small);
    font-weight: 600;
    color: var(--black);
`;
const RightWrap = styled.div`
    font-size: var(--regular--md-small);
    color: var(--gray-blue);
`;
