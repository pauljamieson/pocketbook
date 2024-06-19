import { calculateOverrideValues } from "next/dist/server/font-utils";
import Link from "next/link";
import React from "react";

export default function AccountList({ accounts }: { accounts: any[] }) {
  const savings = accounts.filter((val) => val.type === "SAVINGS");
  const chequing = accounts.filter((val) => val.type === "CHEQUING");
  const creditcards = accounts.filter((val) => val.type === "CREDITCARD");
  const loans = accounts.filter((val) => val.type === "LOAN");

  return (
    <div className="p-2">
      {savings.length > 0 && (
        <>
          <h3>Savings</h3>
          <table>
            <colgroup>
              <col width={"300px"} />
              <col width={"100px"} />
              <col width={"100px"} />
              <col width={"100px"} />
            </colgroup>
            <thead>
              <tr>
                <th className="text-left">Account Name</th>
                <th className="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {savings.map((val) => (
                <tr>
                  <td>
                    <Link className="block" href={`/account/${val.id}`}>
                      {val.name}
                    </Link>
                  </td>
                  <td>
                    <Link className="block" href={`/account/${val.id}`}>
                      {val.value}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <br />
        </>
      )}
      {chequing.length > 0 && (
        <>
          <h3>Chequing</h3>
          <table>
            <colgroup>
              <col width={"300px"} />
              <col width={"100px"} />
            </colgroup>
            <thead>
              <tr>
                <th className="text-left">Account Name</th>
                <th className="text-left">Value</th>
              </tr>
            </thead>
            <tbody>
              {chequing.map((val) => (
                <tr>
                  <td>
                    <Link className="block" href={`/account/${val.id}`}>
                      {val.name}
                    </Link>
                  </td>
                  <td>
                    <Link className="block" href={`/account/${val.id}`}>
                      {val.value}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <br />{" "}
        </>
      )}
      {creditcards.length > 0 && (
        <>
          <h3>Credit Cards</h3>
          <table>
            <colgroup>
              <col width={"300px"} />
              <col width={"100px"} />
              <col width={"100px"} />
              <col width={"100px"} />
            </colgroup>
            <thead>
              <tr>
                <th className="text-left">Account Name</th>
                <th className="text-left">Value</th>
                <th className="text-left">Limit</th>
                <th className="text-left">Interest Rate</th>
              </tr>
            </thead>
            
            <tbody>
              {creditcards.map((val) => (
                <tr>
                  <td>
                    <Link className="block" href={`/account/${val.id}`}>
                      {val.name}
                    </Link>
                  </td>
                  <td>
                    <Link className="block" href={`/account/${val.id}`}>
                      {val.value}
                    </Link>
                  </td>
                  <td>
                    <Link className="block" href={`/account/${val.id}`}>
                      {val.limit}
                    </Link>
                  </td>
                  <td>
                    <Link className="block" href={`/account/${val.id}`}>
                      {val.interestRate}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <br />
        </>
      )}
      {loans.length > 0 && (
        <>
          <h3>Loans</h3>
          <table>
            <colgroup>
              <col width={"300px"} />
              <col width={"100px"} />
              <col width={"100px"} />
              <col width={"100px"} />
            </colgroup>
            <thead>
              <tr>
                <th className="text-left">Account Name</th>
                <th className="text-left">Value</th>
                <th className="text-left">Limit</th>
                <th className="text-left">Interest Rate</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((val) => (
                <tr>
                  <td>{val.name}</td>
                  <td>{val.value}</td>
                  <td>{val.limit}</td>
                  <td>{val.interestRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr />
          <br />
        </>
      )}
    </div>
  );
}

/*
id: 2,
client-1   |     name: 'Power Chequing',
client-1   |     type: 'CHEQUING',
client-1   |     value: 523.12,
client-1   |     limit: 0,
client-1   |     interestRate: 0,
client-1   |     userId: 'clxe2v2ss0000t2bqb2cwyvyu'
*/
