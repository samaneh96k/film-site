import { Typography } from "antd";
import React from "react";
import Link from "next/link";

const { Paragraph } = Typography;

const AdminCard = () => {
  return (
    <div>
      <Typography>
        <Paragraph>
          <ul>
            <li>
              <Link href="/panel">پنل ادمین</Link>
            </li>
            <li>
              <Link href="/docs/spec/overview">...</Link>
            </li>
            <li>
              <Link href="/docs/resources">...</Link>
            </li>
          </ul>
        </Paragraph>
      </Typography>
    </div>
  );
};

export default AdminCard;
