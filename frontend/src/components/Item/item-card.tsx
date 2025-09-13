import type { ItemState } from "@/Pages/ItemPage"
import { CONDITIONS } from "../../constants/dndConstants"

type ItemCardProps = {
  item: ItemState
  cardRef: React.RefObject<HTMLDivElement | null>
}

type ItemCardHeaderProps = {
  item: ItemState
}

type ItemCardContentProps = {
  item: ItemState
}

type ItemCardFooterProps = {
  item: ItemState
}

export default function ItemCard({ item, cardRef }: ItemCardProps) {
  return (
    <div
      ref={cardRef}
      className="flex flex-col w-stretch sm:min-w-xl sm:max-w-xl rounded-md px-6 py-6 gap-6 shadow-xl bg-white border-3 border-gray-900/80 break-words"
    >
      <ItemCardHeader item={item} />
      <ItemCardContent item={item} />
      <ItemCardFooter item={item} />
    </div>
  )
}

function ItemCardHeader({ item }: ItemCardHeaderProps) {
  return (
    <div id="itemcard-header" className="flex flex-row justify-start gap-6">
      {item.file && (
        <img
          src={item.file}
          className="w-auto max-h-32 rounded"
          crossOrigin="anonymous"
        ></img>
      )}
      {!item.file && <div className="h-32 w-26 border-2">image</div>}
      <div className="flex flex-col gap-0 min-w-0">
        <p className="text-2xl font-bold">{item.name || "name"}</p>
        <p className="font-light">
          {(item.type !== "none" && item.type) || "type"}
        </p>
        <p className="font-light">
          {item.dmg} {item.dmgtype !== "none" && item.dmgtype + " damage"}
        </p>
      </div>
    </div>
  )
}

function ItemCardContent({ item }: ItemCardContentProps) {
  return (
    <div id="itemcard-content">
      {item.features.length > 0 ? (
        item.features.map((f, index) => (
          <div key={index}>
            <p>
              <span className="text-xl font-semibold">{f.name} - </span>
              {f.description}
            </p>
          </div>
        ))
      ) : (
        <p>features</p>
      )}
    </div>
  )
}

function ItemCardFooter({ item }: ItemCardFooterProps) {
  return (
    <div id="itemcard-footer" className="flex flex-col gap-2">
      <p className="italic">
        {item.description || "item description / flavour text"}
      </p>
      {item.conditionNames.length > 0 && <div className="border-t-1"></div>}
      {item.conditionNames.map((cn, i) => {
        const condition = CONDITIONS.find((c) => c.name === cn)!
        return (
          <div key={i}>
            <span className="font-semibold text-sm">{condition.name} </span>
            <span className="font-light text-xs leading-none">{condition.description}</span>
          </div>
        )
      })}
    </div>
  )
}
